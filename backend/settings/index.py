import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления общими настройками аккаунта
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
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
    
    # GET - получить текущие настройки
    if method == 'GET':
        settings = {
            'login': 'balooirk138',
            'email': 'spirid.iv@yandex.ru',
            'phone': '+79086668824',
            'phone_verified': True,
            'telegram_account': 'balooirk38',
            'telegram_connected': True,
            'domain': 'balooirk.ru',
            'domain_connected': True,
            'sitemap_enabled': True,
            'image_quality': 90,
            'watermark_position': '5',
            'webp_enabled': True,
            'auth_method': '0',
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
    
    # POST - обновить настройки
    if method == 'POST':
        try:
            body_data = json.loads(event.get('body', '{}'))
            setting_type = body_data.get('type')
            
            if setting_type == 'account':
                email = body_data.get('email', '')
                
                # Валидация email
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
                
                # Здесь должна быть логика сохранения в БД
                # Пока просто возвращаем успех
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Настройки аккаунта обновлены'
                    }),
                    'isBase64Encoded': False
                }
            
            elif setting_type == 'password':
                new_password = body_data.get('new_password', '')
                old_password = body_data.get('old_password', '')
                
                # Валидация паролей
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
                
                # Здесь должна быть логика проверки старого пароля и сохранения нового
                
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
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Настройки sitemap обновлены'
                    }),
                    'isBase64Encoded': False
                }
            
            elif setting_type == 'images':
                quality = body_data.get('quality', 90)
                watermark_position = body_data.get('watermark_position', '0')
                
                # Валидация качества
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
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'message': 'Настройки панели управления обновлены'
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
    
    # DELETE - отвязать Telegram
    if method == 'DELETE':
        params = event.get('queryStringParameters') or {}
        action = params.get('action')
        
        if action == 'telegram':
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