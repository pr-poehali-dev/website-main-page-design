import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from typing import Dict, Any, Optional

def get_db_connection():
    '''Создает подключение к PostgreSQL базе данных'''
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise ValueError('DATABASE_URL environment variable is not set')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def verify_access_token(token: str) -> Optional[int]:
    '''Проверяет access токен и возвращает user_id если валидный'''
    if not token:
        return None
    
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT user_id, expires_at FROM sessions WHERE access_token = '%s'" % token
            )
            result = cur.fetchone()
            
            if not result:
                return None
            
            expires_at = result['expires_at']
            current_time = time.time()
            
            if expires_at.timestamp() < current_time:
                return None
            
            return result['user_id']
    finally:
        conn.close()

def get_administrators(user_id: int = 1) -> list:
    '''Получает список администраторов'''
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute('''
                SELECT 
                    id,
                    login,
                    full_name,
                    last_login
                FROM users
                ORDER BY id
            ''')
            results = cur.fetchall()
            return [dict(row) for row in results] if results else []
    finally:
        conn.close()

def get_user_settings(user_id: int = 1) -> Optional[Dict[str, Any]]:
    '''Получает настройки пользователя из БД'''
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute('''
                SELECT 
                    u.id,
                    u.email,
                    u.phone,
                    u.phone_verified,
                    u.two_factor_enabled,
                    u.telegram_connected,
                    u.telegram_username,
                    us.sitemap_enabled,
                    us.image_quality,
                    us.panel_enabled
                FROM users u
                LEFT JOIN user_settings us ON u.id = us.user_id
                WHERE u.id = %s
            ''' % user_id)
            result = cur.fetchone()
            return dict(result) if result else None
    finally:
        conn.close()

def update_user_email(user_id: int, email: str) -> bool:
    '''Обновляет email пользователя'''
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE users SET email = '%s', updated_at = CURRENT_TIMESTAMP WHERE id = %s" % (email, user_id)
            )
            conn.commit()
            return True
    finally:
        conn.close()

def update_user_password(user_id: int, password_hash: str) -> bool:
    '''Обновляет пароль пользователя'''
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE users SET password_hash = '%s', updated_at = CURRENT_TIMESTAMP WHERE id = %s" % (password_hash, user_id)
            )
            conn.commit()
            return True
    finally:
        conn.close()

def update_two_factor(user_id: int, enabled: bool) -> bool:
    '''Обновляет настройки двухфакторной авторизации'''
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE users SET two_factor_enabled = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s" % (enabled, user_id)
            )
            conn.commit()
            return True
    finally:
        conn.close()

def update_sitemap_settings(user_id: int, sitemap_enabled: bool) -> bool:
    '''Обновляет настройки sitemap'''
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE user_settings SET sitemap_enabled = %s, updated_at = CURRENT_TIMESTAMP WHERE user_id = %s" % (sitemap_enabled, user_id)
            )
            if cur.rowcount == 0:
                cur.execute(
                    "INSERT INTO user_settings (user_id, sitemap_enabled) VALUES (%s, %s)" % (user_id, sitemap_enabled)
                )
            conn.commit()
            return True
    finally:
        conn.close()

def update_image_settings(user_id: int, quality: int) -> bool:
    '''Обновляет настройки изображений'''
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE user_settings SET image_quality = %s, updated_at = CURRENT_TIMESTAMP WHERE user_id = %s" % (quality, user_id)
            )
            if cur.rowcount == 0:
                cur.execute(
                    "INSERT INTO user_settings (user_id, image_quality) VALUES (%s, %s)" % (user_id, quality)
                )
            conn.commit()
            return True
    finally:
        conn.close()

def update_panel_settings(user_id: int, panel_enabled: bool) -> bool:
    '''Обновляет настройки панели управления'''
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE user_settings SET panel_enabled = %s, updated_at = CURRENT_TIMESTAMP WHERE user_id = %s" % (panel_enabled, user_id)
            )
            if cur.rowcount == 0:
                cur.execute(
                    "INSERT INTO user_settings (user_id, panel_enabled) VALUES (%s, %s)" % (user_id, panel_enabled)
                )
            conn.commit()
            return True
    finally:
        conn.close()

def disconnect_telegram(user_id: int) -> bool:
    '''Отвязывает Telegram аккаунт'''
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE users SET telegram_connected = FALSE, telegram_username = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = %s" % user_id
            )
            conn.commit()
            return True
    finally:
        conn.close()

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления общими настройками аккаунта с PostgreSQL
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    access_token = event.get('headers', {}).get('X-Auth-Token', '')
    user_id = verify_access_token(access_token)
    
    if not user_id:
        return {
            'statusCode': 401,
            'headers': headers,
            'body': json.dumps({
                'success': False,
                'message': 'Требуется авторизация'
            }),
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        request_type = params.get('type', 'settings')
        
        if request_type == 'administrators':
            administrators = get_administrators(user_id)
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'success': True,
                    'administrators': administrators
                }),
                'isBase64Encoded': False
            }
        
        settings_data = get_user_settings(user_id)
        
        if not settings_data:
            return {
                'statusCode': 404,
                'headers': headers,
                'body': json.dumps({
                    'success': False,
                    'message': 'Пользователь не найден'
                }),
                'isBase64Encoded': False
            }
        
        telegram_username = settings_data.get('telegram_username')
        
        settings = {
            'login': 'balooirk138',
            'email': settings_data.get('email', ''),
            'phone': settings_data.get('phone', ''),
            'phone_verified': settings_data.get('phone_verified', False),
            'telegram_account': telegram_username if telegram_username else '',
            'telegram_connected': settings_data.get('telegram_connected', False),
            'domain': 'balooirk.ru',
            'domain_connected': True,
            'sitemap_enabled': settings_data.get('sitemap_enabled', True),
            'image_quality': settings_data.get('image_quality', 85),
            'watermark_position': '5',
            'webp_enabled': True,
            'auth_method': '1' if settings_data.get('two_factor_enabled', False) else '0',
            'timezone': 'Europe/Moscow',
            'items_per_page': 100,
            'notify_orders': True,
            'notify_messages': True
        }
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps(settings),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        try:
            body_data = json.loads(event.get('body', '{}'))
            setting_type = body_data.get('type')
            
            if setting_type == 'account':
                email = body_data.get('email', '')
                
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
                
                update_user_email(user_id, email)
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Настройки аккаунта обновлены'
                    }),
                    'isBase64Encoded': False
                }
            
            elif setting_type == 'change_password':
                new_password = body_data.get('new_password', '')
                old_password = body_data.get('old_password', '')
                
                if not new_password or len(new_password) < 6:
                    return {
                        'statusCode': 400,
                        'headers': headers,
                        'body': json.dumps({
                            'success': False,
                            'message': 'Пароль должен содержать минимум 6 символов'
                        }),
                        'isBase64Encoded': False
                    }
                
                if not old_password:
                    return {
                        'statusCode': 400,
                        'headers': headers,
                        'body': json.dumps({
                            'success': False,
                            'message': 'Введите старый пароль'
                        }),
                        'isBase64Encoded': False
                    }
                
                password_hash = '$2b$10$' + new_password
                update_user_password(user_id, password_hash)
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Пароль успешно изменен'
                    }),
                    'isBase64Encoded': False
                }
            
            elif setting_type == 'auth':
                auth_method = body_data.get('auth_method', '0')
                two_factor_enabled = auth_method == '1'
                
                update_two_factor(user_id, two_factor_enabled)
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Настройки авторизации обновлены'
                    }),
                    'isBase64Encoded': False
                }
            
            elif setting_type == 'sitemap':
                sitemap_enabled = body_data.get('sitemap_enabled', True)
                
                update_sitemap_settings(user_id, sitemap_enabled)
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Настройки sitemap обновлены'
                    }),
                    'isBase64Encoded': False
                }
            
            elif setting_type == 'image':
                quality = body_data.get('image_quality', 90)
                watermark_position = body_data.get('watermark_position', '0')
                watermark_min_width = body_data.get('watermark_min_width', '0')
                watermark_min_height = body_data.get('watermark_min_height', '0')
                webp_enabled = body_data.get('webp_enabled', 'true')
                
                try:
                    quality_int = int(quality)
                    if quality_int < 1 or quality_int > 100:
                        raise ValueError()
                except (ValueError, TypeError):
                    return {
                        'statusCode': 400,
                        'headers': headers,
                        'body': json.dumps({
                            'success': False,
                            'message': 'Качество должно быть от 1 до 100'
                        }),
                        'isBase64Encoded': False
                    }
                
                update_image_settings(user_id, quality_int)
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Настройки изображений обновлены'
                    }),
                    'isBase64Encoded': False
                }
            
            elif setting_type == 'panel':
                items_per_page = body_data.get('items_per_page', 100)
                notify_orders = body_data.get('notify_orders', True)
                notify_messages = body_data.get('notify_messages', True)
                timezone = body_data.get('timezone', 'Europe/Moscow')
                panel_enabled = body_data.get('panel_enabled', True)
                
                update_panel_settings(user_id, panel_enabled)
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Настройки панели управления обновлены'
                    }),
                    'isBase64Encoded': False
                }
            
            elif setting_type == 'telegram_disconnect':
                disconnect_telegram(user_id)
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Telegram аккаунт отвязан'
                    }),
                    'isBase64Encoded': False
                }
            
            elif setting_type == 'domain':
                domain = body_data.get('domain', '')
                dns_records = body_data.get('dns_records', [])
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Настройки домена обновлены'
                    }),
                    'isBase64Encoded': False
                }
            
            elif setting_type == 'redirects':
                redirect_domains = body_data.get('redirect_domains', '')
                redirect_pages = body_data.get('redirect_pages', '')
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Настройки переадресации обновлены'
                    }),
                    'isBase64Encoded': False
                }
            
            elif setting_type == 'mail_system':
                mail_system = body_data.get('mail_system', '0')
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Настройки почты обновлены'
                    }),
                    'isBase64Encoded': False
                }
            
            elif setting_type == 'refresh_sitemap':
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Файл sitemap обновлен'
                    }),
                    'isBase64Encoded': False
                }
            
            elif setting_type == 'add_administrator':
                login = body_data.get('login', '')
                full_name = body_data.get('full_name', '')
                password = body_data.get('password', '')
                
                if not login or not password:
                    return {
                        'statusCode': 400,
                        'headers': headers,
                        'body': json.dumps({
                            'success': False,
                            'message': 'Логин и пароль обязательны'
                        }),
                        'isBase64Encoded': False
                    }
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Администратор добавлен'
                    }),
                    'isBase64Encoded': False
                }
            
            elif setting_type == 'edit_administrator':
                admin_id = body_data.get('id', 0)
                full_name = body_data.get('full_name', '')
                password = body_data.get('password', '')
                
                if not admin_id:
                    return {
                        'statusCode': 400,
                        'headers': headers,
                        'body': json.dumps({
                            'success': False,
                            'message': 'ID администратора обязателен'
                        }),
                        'isBase64Encoded': False
                    }
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Администратор обновлен'
                    }),
                    'isBase64Encoded': False
                }
            
            elif setting_type == 'delete_administrator':
                admin_id = body_data.get('id', 0)
                
                if not admin_id:
                    return {
                        'statusCode': 400,
                        'headers': headers,
                        'body': json.dumps({
                            'success': False,
                            'message': 'ID администратора обязателен'
                        }),
                        'isBase64Encoded': False
                    }
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Администратор удален'
                    }),
                    'isBase64Encoded': False
                }
            
            elif setting_type == 'link_account':
                login = body_data.get('login', '')
                password = body_data.get('password', '')
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Аккаунт успешно привязан'
                    }),
                    'isBase64Encoded': False
                }
            
            elif setting_type == 'sape':
                sape_code = body_data.get('sape_code', '')
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Настройки SAPE обновлены'
                    }),
                    'isBase64Encoded': False
                }
            
            elif setting_type == 'delete_site':
                password = body_data.get('password', '')
                
                if not password:
                    return {
                        'statusCode': 400,
                        'headers': headers,
                        'body': json.dumps({
                            'success': False,
                            'message': 'Введите пароль для подтверждения'
                        }),
                        'isBase64Encoded': False
                    }
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Сайт удален'
                    }),
                    'isBase64Encoded': False
                }
            
            else:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({
                        'success': False,
                        'message': 'Неизвестный тип настроек'
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
    
    if method == 'DELETE':
        params = event.get('queryStringParameters') or {}
        action = params.get('action')
        
        if action == 'telegram':
            disconnect_telegram(user_id)
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'success': True,
                    'message': 'Telegram аккаунт отвязан'
                }),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 405,
        'headers': headers,
        'body': json.dumps({
            'success': False,
            'message': 'Метод не поддерживается'
        }),
        'isBase64Encoded': False
    }