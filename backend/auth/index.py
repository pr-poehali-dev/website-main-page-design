import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
import hashlib
import secrets
import time
from typing import Dict, Any, Optional, Tuple

def get_db_connection():
    '''Создает подключение к PostgreSQL базе данных'''
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise ValueError('DATABASE_URL environment variable is not set')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def hash_password(password: str) -> str:
    '''Хеширует пароль с использованием SHA256 и соли'''
    salt = 'poehali_salt_2025'
    return hashlib.sha256((password + salt).encode()).hexdigest()

def verify_password(password: str, password_hash: str) -> bool:
    '''Проверяет соответствие пароля хешу'''
    return hash_password(password) == password_hash

def generate_tokens() -> Tuple[str, str]:
    '''Генерирует access и refresh токены'''
    access_token = secrets.token_urlsafe(32)
    refresh_token = secrets.token_urlsafe(32)
    return access_token, refresh_token

def create_session(user_id: int, access_token: str, refresh_token: str, ip_address: str, user_agent: str) -> bool:
    '''Создает новую сессию в БД'''
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            expires_at = int(time.time()) + (7 * 24 * 60 * 60)
            cur.execute(
                "INSERT INTO sessions (user_id, access_token, refresh_token, ip_address, user_agent, expires_at) VALUES (%s, '%s', '%s', '%s', '%s', to_timestamp(%s))" % (user_id, access_token, refresh_token, ip_address, user_agent, expires_at)
            )
            conn.commit()
            return True
    finally:
        conn.close()

def get_user_by_email(email: str) -> Optional[Dict[str, Any]]:
    '''Получает пользователя по email'''
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM users WHERE email = '%s'" % email)
            result = cur.fetchone()
            return dict(result) if result else None
    finally:
        conn.close()

def create_user(email: str, password: str, phone: str = '') -> Optional[int]:
    '''Создает нового пользователя'''
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            existing = get_user_by_email(email)
            if existing:
                return None
            
            password_hash = hash_password(password)
            cur.execute(
                "INSERT INTO users (email, password_hash, phone, phone_verified) VALUES ('%s', '%s', '%s', FALSE) RETURNING id" % (email, password_hash, phone)
            )
            result = cur.fetchone()
            user_id = result['id'] if result else None
            
            if user_id:
                cur.execute(
                    "INSERT INTO user_settings (user_id, sitemap_enabled, image_quality, panel_enabled) VALUES (%s, TRUE, 85, TRUE)" % user_id
                )
            
            conn.commit()
            return user_id
    except Exception:
        return None
    finally:
        conn.close()

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для авторизации пользователей с JWT токенами
    Args: event - dict с httpMethod, body, headers
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict с токенами или ошибкой
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({
                'success': False,
                'message': 'Метод не поддерживается'
            }),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        action = body_data.get('action')
        email = body_data.get('email', '').strip().lower()
        password = body_data.get('password', '')
        
        if not email or '@' not in email:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({
                    'success': False,
                    'message': 'Некорректный email адрес'
                }),
                'isBase64Encoded': False
            }
        
        if not password or len(password) < 6:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({
                    'success': False,
                    'message': 'Пароль должен содержать минимум 6 символов'
                }),
                'isBase64Encoded': False
            }
        
        request_context = event.get('requestContext', {})
        identity = request_context.get('identity', {})
        ip_address = identity.get('sourceIp', 'unknown')
        user_agent = event.get('headers', {}).get('User-Agent', 'unknown')
        
        if action == 'register':
            existing_user = get_user_by_email(email)
            if existing_user:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({
                        'success': False,
                        'message': 'Пользователь с таким email уже существует'
                    }),
                    'isBase64Encoded': False
                }
            
            phone = body_data.get('phone', '')
            user_id = create_user(email, password, phone)
            
            if not user_id:
                return {
                    'statusCode': 500,
                    'headers': headers,
                    'body': json.dumps({
                        'success': False,
                        'message': 'Ошибка при создании пользователя'
                    }),
                    'isBase64Encoded': False
                }
            
            access_token, refresh_token = generate_tokens()
            create_session(user_id, access_token, refresh_token, ip_address, user_agent)
            
            return {
                'statusCode': 201,
                'headers': headers,
                'body': json.dumps({
                    'success': True,
                    'message': 'Регистрация прошла успешно',
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                    'user': {
                        'id': user_id,
                        'email': email
                    }
                }),
                'isBase64Encoded': False
            }
        
        elif action == 'refresh':
            refresh_token = body_data.get('refresh_token', '')
            
            if not refresh_token:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({
                        'success': False,
                        'message': 'Refresh token обязателен'
                    }),
                    'isBase64Encoded': False
                }
            
            conn = get_db_connection()
            try:
                with conn.cursor() as cur:
                    cur.execute(
                        "SELECT user_id, expires_at FROM sessions WHERE refresh_token = '%s'" % refresh_token
                    )
                    result = cur.fetchone()
                    
                    if not result:
                        return {
                            'statusCode': 401,
                            'headers': headers,
                            'body': json.dumps({
                                'success': False,
                                'message': 'Невалидный refresh token'
                            }),
                            'isBase64Encoded': False
                        }
                    
                    expires_at = result['expires_at']
                    current_time = time.time()
                    
                    if expires_at.timestamp() < current_time:
                        return {
                            'statusCode': 401,
                            'headers': headers,
                            'body': json.dumps({
                                'success': False,
                                'message': 'Refresh token истёк'
                            }),
                            'isBase64Encoded': False
                        }
                    
                    user_id = result['user_id']
                    
                    new_access_token, new_refresh_token = generate_tokens()
                    
                    cur.execute(
                        "UPDATE sessions SET access_token = '%s', refresh_token = '%s', updated_at = CURRENT_TIMESTAMP WHERE refresh_token = '%s'" % (new_access_token, new_refresh_token, refresh_token)
                    )
                    conn.commit()
                    
                    cur.execute("SELECT email, phone, phone_verified FROM users WHERE id = %s" % user_id)
                    user_data = cur.fetchone()
                    
                    return {
                        'statusCode': 200,
                        'headers': headers,
                        'body': json.dumps({
                            'success': True,
                            'message': 'Токен обновлён',
                            'access_token': new_access_token,
                            'refresh_token': new_refresh_token,
                            'user': {
                                'id': user_id,
                                'email': user_data['email'] if user_data else '',
                                'phone': user_data['phone'] if user_data else '',
                                'phone_verified': user_data['phone_verified'] if user_data else False
                            }
                        }),
                        'isBase64Encoded': False
                    }
            finally:
                conn.close()
        
        elif action == 'login':
            user = get_user_by_email(email)
            
            if not user:
                return {
                    'statusCode': 401,
                    'headers': headers,
                    'body': json.dumps({
                        'success': False,
                        'message': 'Неверный email или пароль'
                    }),
                    'isBase64Encoded': False
                }
            
            if not verify_password(password, user['password_hash']):
                return {
                    'statusCode': 401,
                    'headers': headers,
                    'body': json.dumps({
                        'success': False,
                        'message': 'Неверный email или пароль'
                    }),
                    'isBase64Encoded': False
                }
            
            access_token, refresh_token = generate_tokens()
            create_session(user['id'], access_token, refresh_token, ip_address, user_agent)
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'success': True,
                    'message': 'Вход выполнен успешно',
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                    'user': {
                        'id': user['id'],
                        'email': user['email'],
                        'phone': user['phone'],
                        'phone_verified': user['phone_verified']
                    }
                }),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({
                    'success': False,
                    'message': 'Неизвестное действие. Используйте action: register, login или refresh'
                }),
                'isBase64Encoded': False
            }
            
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({
                'success': False,
                'message': 'Некорректный JSON'
            }),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'success': False,
                'message': f'Внутренняя ошибка сервера: {str(e)}'
            }),
            'isBase64Encoded': False
        }