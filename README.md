# *El Glotón*

### Project by:
* Machaca Hancco Jesus :boy:
* Moreno Villegas Royer :boy:
* Aguilar Vilca Carlos :boy:
* Manzano Añamuro Jorge :boy:
  
## Description.
This project is an online platform where users can buy the dishes they most want. A platform that combines two web frameworks (Django and React) to do interesting things like creating a REST API.

# Main technologies : 

## [REACT](https://es.react.dev/) :pushpin:
## [DJANGO](https://www.djangoproject.com/) :pushpin:

---

# Instalation :page_with_curl: .
## Note :warning: :
### The entire project was developed on Linux, so many of the commands will only work on Linux.

**First clone the repository.**

```sh
git clone https://github.com/JsasMachaca/El-Gloton-git.git
cd El-Gloton-git
```

# React Dependencies :heavy_check_mark: :
**To access directory**
```sh
cd client
```

### Install dependencies and execute project.

```bash
npm install
npm run dev
```

# Django Dependencies :heavy_check_mark: :
**To access directory.**
```bash
cd server
```

### Create and activate vitual enviroment (Linux & Windows).
**In Linux:**
```bash
python -m venv venv
. venv/bin/activate
```

**In Windows:**
```bash
python -m venv venv
. venv\Scripts\activate
```

**Install all dependencies and execute project.**
```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
