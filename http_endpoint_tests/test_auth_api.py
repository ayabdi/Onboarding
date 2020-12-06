import requests
import json
import sys

def login(email, password):
	data = {
		"email": email,
		"password": password
	}

	r = requests.post("http://localhost:5000/api/auth/login", json=data)
	return r.text

def register(email, password, confirm_password):
	data = {
		"email": email,
		"password": password,
		"passwordConfirm": confirm_password
	}

	r = requests.post("http://localhost:5000/api/auth/register", json=data)
	return r.text

def token(refresh_token):
	data = {
		"token": refresh_token
	}

	r = requests.post("http://localhost:5000/api/auth/token", json=data)
	return r.text

def logout(refresh_token):
	data = {
		"token": refresh_token
	}

	r = requests.post("http://localhost:5000/api/auth/logout", json=data)
	return r.text

def forgot(email):
	data = {
		"email": email
	}

	r = requests.post("http://localhost:5000/api/auth/forgot", json=data)
	return r.text

def main():
	if len(sys.argv) != 4:
		print("Usage: python3 " + sys.argv[0] + " [EMAIL] [PASSWORD] [CONFIRM-PASSWORD]")
		sys.exit(1)

	email = sys.argv[1]
	password = sys.argv[2]
	confirm_password = sys.argv[3]

	print("Registering...")
	register_resp = register(email, password, confirm_password)
	print("Register response:")
	print(register_resp)
	print("")

	print("Requesting forgotten password...")
	forgot_resp = forgot(email)
	print("Forgot response:")
	print(forgot_resp)
	print("")

	print("Logging in...")
	login_resp = login(email, password)
	token_data = json.loads(login_resp)
	refresh_token = token_data["refreshToken"]
	print("Login response:")
	print(login_resp)
	print("")

	print("Generating a new access token...")
	token_resp = token(refresh_token)
	print("Token response:")
	print(token_resp)
	print("")

	print("Logging out...")
	logout_resp = logout(refresh_token)
	print("Logout response:")
	print(logout_resp)
	print("")

if __name__ == "__main__":
	main()