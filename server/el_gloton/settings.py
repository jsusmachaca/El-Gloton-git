from datetime import timedelta
from pathlib import Path
# from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent


SECRET_KEY = 'django-insecure-k^b(x%5k9)4bf^3_r#0jgn+1nuc)j!a^rpa^z%v5cx0=j!4+z1'

DEBUG = True


REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}

ALLOWED_HOSTS = [
    '*',
]

CORS_ALLOW_ALL_ORIGINS = True


DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
REST_FRAMEWORK_APPS = [
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
]
LOCAL_APPS = [
    'apps.authentication',
    'apps.home',
    'apps.dashboard',
    'apps.administration'
]


INSTALLED_APPS = DJANGO_APPS + REST_FRAMEWORK_APPS + LOCAL_APPS



MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = 'el_gloton.urls'


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


WSGI_APPLICATION = 'el_gloton.wsgi.application'

DATABASES = {        
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


"""
if config('DB_CONNECTION') == 'sqlite3':
    DATABASES = {        
        'default': {
            'ENGINE': f'django.db.backends.{config("DB_CONNECTION")}',
            'NAME': BASE_DIR / config('DB_NAME'),
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': f'django.db.backends.{config("DB_CONNECTION")}',
            'HOST': config('DB_HOST'),
            'PORT': config('DB_PORT'),
            'NAME': config('DB_NAME'),
            'USER': config('DB_USER'),
            'PASSWORD': config('DB_PASSWORD'),
        }
    }
"""


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]




LANGUAGE_CODE = 'es-pe'
TIME_ZONE = 'America/Lima'
USE_I18N = True
USE_L10N = True
USE_TZ = True


STATIC_URL = 'static/'
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

STATIC_ROOT = BASE_DIR / 'static'

# settings.py

MQTT_BROKER_ADDRESS='localhost'
MQTT_BROKER_PORT=1883
MQTT_TOPIC='esp/gloton'


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'