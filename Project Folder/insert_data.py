import pymongo
import pandas as pd

# Setup connection to mongodb
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# Select database and collection to use
db = client.dummy3fire_db
collection = db.dummy3fire_table

csv_file = 'FireDummyData.csv'
fire_data = pd.read_csv(csv_file)
fire_data_lite = fire_data[["OBJECTID","FIRE_NAME","FIRE_YEAR","DISCOVERY_DOY"]]
fire_dict = fire_data_lite.to_dict('records')

collection.insert_many(fire_dict)

print("Data Uploaded!")