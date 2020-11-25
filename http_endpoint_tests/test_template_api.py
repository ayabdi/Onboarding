import requests
import sys

def post(template_name):
	emails = [
		{ "subject": "TestSubject1", "message": "TestMessage1", "days":[ 1 ] },
		{ "subject": "TestSubject2", "message": "TestMessage2", "days":[ 1, 2 ] },
		{ "subject": "TestSubject3", "message": "TestMessage3", "days":[ 1, 2, 3 ] }
	]

	tasks = [
		{ "name": "TestName1", "note": "TestNote1", "due_days": 1, "reminder_days": [ 1 ] },
		{ "name": "TestName2", "note": "TestNote2", "due_days": 2, "reminder_days": [ 1, 2 ] },
		{ "name": "TestName3", "note": "TestNote3", "due_days": 3, "reminder_days": [ 1, 2, 3 ] }
	]

	data = {
		"name": template_name,
		"emails": emails,
		"tasks": tasks
	}

	r = requests.post("http://localhost:5000/templates", json=data)
	return r.text

def get(template_name):
	r = requests.get("http://localhost:5000/templates/name/" + template_name)
	return r.text

def patch(template_name):
	tasks = [
		{ "name": "TestName4", "note": "TestNote4", "due_days": 4, "reminder_days": [ 4 ] },
		{ "name": "TestName5", "note": "TestNote5", "due_days": 5, "reminder_days": [ 4, 5 ] },
		{ "name": "TestName6", "note": "TestNote6", "due_days": 6, "reminder_days": [ 4, 5, 6 ] }
	]

	data = {
		"name": template_name,
		"new_tasks": tasks
	}

	r = requests.patch("http://localhost:5000/templates", json=data)
	return r.text

def delete(template_name):
	r = requests.delete("http://localhost:5000/templates/name/" + template_name)
	return r.text

def main():
	if len(sys.argv) != 2:
		print("Usage: python3 " + sys.argv[0] + " [TEMPLATE-NAME]")
		sys.exit(1)

	template_name = sys.argv[1]

	print("Testing HTTP POST...")
	post_resp = post(template_name)
	print("HTTP POST response:")
	print(post_resp)
	print("")

	print("Testing HTTP PATCH...")
	patch_resp = patch(template_name)
	print("HTTP PATCH response:")
	print(patch_resp)
	print("")

	print("Testing HTTP GET...")
	get_resp = get(template_name)
	print("HTTP GET response:")
	print(get_resp)
	print("")

	print("Testing HTTP DELETE...")
	delete_resp = delete(template_name)
	print("HTTP DELETE response:")
	print(delete_resp)
	print("")

if __name__ == "__main__":
	main()