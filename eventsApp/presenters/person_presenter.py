class PersonPresenter:
    def create_person_success_response(self, personId):
        return {
            "message": "Person created Successfully",
            "id": personId
        }
    def invalid_data(self):
        return {
            "message": "Please ensure all the required fields are passed with proper values"
        }
    def invalid_mail(self):
        return {
            "message": "User already exists"
        }
