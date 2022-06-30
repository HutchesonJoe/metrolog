
puts "Metro seeding..."

#tenants

joe = Tenant.create(first_name: "Joe", last_name: "Schmoe", email: "joe@schmoe.com", phone_number: "646-842-2454", additional_tenants: "Mary Schmoe", currently_occupying: true, password: "joe", password_confirmation: "joe")
fee = Tenant.create(first_name: "Felecia", last_name: "Harrelson", email: "fee@harrelson.com", phone_number: "646-842-2454", currently_occupying: true, password: "felecia", password_confirmation: "felecia")
cindy = Tenant.create(first_name: "Cindy", last_name: "Holmes", email: "cindy@gmail.com", phone_number: "646-842-2454", additional_tenants: "Sandy Smith", currently_occupying: true, password: "cindy", password_confirmation: "cindy")
dan = Tenant.create(first_name: "Daniel", last_name: "Craig", email: "dcraig@yahoo.com", phone_number: "646-842-2454", currently_occupying: true, password: "dan", password_confirmation: "dan")

#supers

tony = Super.create(first_name: "Antonio", last_name: "Banderas", email: "Abanderas@gmail.com", phone_number: "777-777-7777", password: "tony", password_confirmation: "tony")
ramone = Super.create(first_name: "Ramone", last_name: "Olivas", email: "rolivas@gmail.com", phone_number: "222-222-2222", password: "tony", password_confirmation: "tony")
alan = Super.create(first_name: "Alan", last_name: "Smith", email: "asmith@yomama.com", phone_number: "765-656-8989", password: "alan", password_confirmation: "alan")

#complaints

hot_water = Complaint.create(complaint_type: "Hot Water")
pests = Complaint.create(complaint_type: "Pests")
mold = Complaint.create(complaint_type: "Mold")
noise = Complaint.create(complaint_type: "Noise")
other = Complaint.create(complaint_type: "Other")

#building

riverside = Building.create(address: "17 Riverside Drive", number_of_units: 42, super_id: ramone.id)
eastside = Building.create(address: "330 E 74th Street", number_of_units: 14, super_id: alan.id)
westside1 = Building.create(address: "168 W 107th Street", number_of_units: 36, super_id: alan.id)
westside2 = Building.create(address: "425 W 57th Street", number_of_units: 124, super_id: tony.id)


#apartments
joes_apartment = Apartment.create(building_id: eastside.id, unit_number: "1B", tenant_id: joe.id)
fees_apartment = Apartment.create(building_id: riverside.id, unit_number: "24", tenant_id: joe.id)
cindys_apartment = Apartment.create(building_id: westside1.id, unit_number: "14A", tenant_id: cindy.id)
dans_apartment = Apartment.create(building_id: westside2.id, unit_number: "4C", tenant_id: dan.id)

#tenant_complaints
mold_complaint = TenantComplaint.create(tenant_id: joe.id, complaint_id: mold.id, resolved: false, tenant_notes: "Black mold under kitchen sink.")
hot_water_complaint = TenantComplaint.create(tenant_id: fee.id, complaint_id: hot_water.id, resolved: false, tenant_notes: "No hot water at night, after 6pm.")
noise_complaint = TenantComplaint.create(tenant_id: cindy.id, complaint_id: noise.id, resolved: false, tenant_notes: "Loud kids in the hallway.")
pests = TenantComplaint.create(tenant_id: dan.id, complaint_id: pests.id, resolved: false, tenant_notes: "Aggresive cockroach infestation.", super_notes: "Exterminator scheduled")

puts "Metro seeded!"
