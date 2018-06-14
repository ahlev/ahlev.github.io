#Personal Touch

class Producer:

	ukey = 0
	#initialize the Producer object with the essential info: last and first name, user name, and phone number. Also generate a random key for the user and verify its uniqueness.
	def __init__(self):
		#ukey = random serial number
		Producer.lname = raw_input("What is your last name?")
		Producer.fname = raw_input("What is your first name?")
		Producer.uname = raw_input("What is your desired username?")
		Producer.pnumber = raw_input("What is your phone number?")
		
		pass
		
		
	def addInventory(self):
		type = raw_input("What type of vegetable do you have?")
		amount = raw_input("How many of " + type + " do you have?")
		quality = raw_input("What quality would you say your " + type " are?")
		# import MySQLdb
		# conn = MySQLdb.connect(host= "localhost",
            # user="root",
            # passwd="newpassword",
            # db="producerTable")
		# x = conn.cursor()

		# try:
			# x.execute(str("""INSERT INTO producerTable VALUES (type, amount, quality)"""),(188,90))
			# conn.commit()
		# except:
			# conn.rollback()
		
	
	
	

