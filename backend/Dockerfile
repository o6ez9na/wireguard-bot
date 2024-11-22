FROM python:3.12
ENV PIP_ROOT_USER_ACTION=ignore
RUN mkdir usr/src/code && apt update && apt install libldap2-dev libsasl2-dev -y

WORKDIR /usr/src/code
COPY . .
EXPOSE 8000

RUN pip3 install --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host=files.pythonhosted.org -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
