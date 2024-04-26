from flask import Flask, request, jsonify
import cohere
from flask_cors import CORS
import os




app = Flask(__name__)
CORS(app, resources={r"/flask/*": {"origins": ["http://localhost:3000", "https://medmap.vercel.app/", "http://5.78.119.58:30031"]}})
COHERE_API_KEY = os.environ.get('COHERE_API_KEY')
co = cohere.Client(COHERE_API_KEY)

@app.route('/')
def home():
    return "Welcome to the MedNet Docker New"


@app.route('/flask/web-search', methods=['POST'])
def web_search():
    data = request.get_json()
    search_query = data['searchQuery']  

    response = co.chat(
        model="command",
        message=f"""
#       Given the medication "{search_query}", return the 3 most common brand names but I will Specify how to create the output.
#       For example, if {search_query} is ibuprofen, then Advil, Midol, and Motrin would be returned. Format the output as a string
#       that looks exactly like this: "The brand names for {search_query} are: OUTPUT1, OUTPUT2, OUTPUT3." where OUTPUT1, OUTPUT2,
#       and OUTPUT3 are the 3 most common brand names for the {search_query}. For example, if the medication was 
#       "ibuprofen", the expected output format would be: "The brand names for ibuprofen are: Advil, Midol, and Motrin." 
#       Adhere to this structured format strictly!
#     """,
        connectors=[{"id": "web-search"}]
    )

    return jsonify({'text': response.text})

@app.route('/flask/client-search', methods=['POST'])
def client_search():
    data = request.get_json()
    client_search_query = data['clientSearchQuery']

    other_response = co.chat(
        model="command",
        message=f"""
#       Given the medication "{client_search_query}", return the scientific name of the medication but I will specify how
#       to create the output.
#       For example, if {client_search_query} is Advil, then ibuprofen would be returned. Format the output as a string
#       that outputs exactly like this: "The generic name for {client_search_query} is OUTPUT." where
#       OUTPUT is the scientific name for {client_search_query}. For example, If the medication was 
#       "advil", the expected output format would be "The generic name for advil is ibuprofen." Adhere to this structured format strictly!
#     """,
        connectors=[{"id": "web-search"}]
    )

    return jsonify({'text': other_response.text})


if __name__ == '__main__':
    app.run(host='0.0.0.0')

    
