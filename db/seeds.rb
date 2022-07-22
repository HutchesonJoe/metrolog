
puts "Metro seeding..."

#tenants

joe = Tenant.create(first_name: "Joe", last_name: "Schmoe", email: "joe@schmoe.com", phone_number: "646-842-2454", additional_tenants: "Mary Schmoe", currently_occupying: true, password: "joe", username: "joe", password_confirmation: "joe")
fee = Tenant.create(first_name: "Felecia", last_name: "Harrelson", email: "fee@harrelson.com", phone_number: "646-842-2454", currently_occupying: true, password: "felecia", username: "felecia", password_confirmation: "felecia")
cindy = Tenant.create(first_name: "Cindy", last_name: "Holmes", email: "cindy@gmail.com", phone_number: "646-842-2454", additional_tenants: "Sandy Smith", currently_occupying: true, username: "cindy", password: "cindy",  password_confirmation: "cindy")
dan = Tenant.create(first_name: "Daniel", last_name: "Craig", email: "dcraig@yahoo.com", phone_number: "646-842-2454", currently_occupying: true, username: "dan", password: "dan", password_confirmation: "dan")
sonia = Tenant.create(first_name: "Sonia", last_name: "Marquez", email: "sonia@marquez.com", phone_number: "646-842-2454", additional_tenants: "Jim Marquez, Cindy Marquez", currently_occupying: true, password: "sonia", username: "sonia", password_confirmation: "sonia")
#supers

tony = Super.create(first_name: "Antonio", last_name: "Banderas", email: "Abanderas@gmail.com", phone_number: "777-777-7777", username: "tony", password: "tony", password_confirmation: "tony")
ramone = Super.create(first_name: "Ramone", last_name: "Olivas", email: "rolivas@gmail.com", phone_number: "222-222-2222", username: "ramone", password: "ramone", password_confirmation: "ramone")
alan = Super.create(first_name: "Alan", last_name: "Smith", email: "asmith@yomama.com", phone_number: "765-656-8989", username: "alan", password: "alan", password_confirmation: "alan")

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
uptown = Building.create(address: "230 E 120th Street", number_of_units: 29, super_id: ramone.id)


#apartments
joes_apartment = Apartment.create(building_id: eastside.id, unit_number: "1B", tenant_id: joe.id)
fees_apartment = Apartment.create(building_id: riverside.id, unit_number: "24", tenant_id: fee.id)
cindys_apartment = Apartment.create(building_id: westside1.id, unit_number: "14A", tenant_id: cindy.id)
dans_apartment = Apartment.create(building_id: westside2.id, unit_number: "4C", tenant_id: dan.id)
sonias_apartment = Apartment.create(building_id: eastside.id, unit_number: "3C", tenant_id: sonia.id)
#tenant_complaints
mold_complaint = TenantComplaint.create(tenant_id: joe.id, building_id: eastside.id, complaint_id: mold.id, resolved: false, tenant_notes: "Black mold under kitchen sink.", unit: "1B")
hot_water_complaint = TenantComplaint.create(tenant_id: fee.id, building_id: riverside.id, complaint_id: hot_water.id, resolved: false, tenant_notes: "No hot water at night, after 6pm.", unit: "24")
mold_complaint = TenantComplaint.create(tenant_id: fee.id, building_id: riverside.id, complaint_id: mold.id, resolved: true, tenant_notes: "Black mold under kitchen sink.", unit: "24")
noise_complaint = TenantComplaint.create(tenant_id: cindy.id, building_id: westside1.id, complaint_id: noise.id, resolved: false, tenant_notes: "Loud kids in the hallway.", unit: "14A")
pests = TenantComplaint.create(tenant_id: dan.id, building_id: westside2.id, complaint_id: pests.id, resolved: false, tenant_notes: "Aggresive cockroach infestation.", super_notes: "Exterminator scheduled", unit: dans_apartment.unit_number)
other = TenantComplaint.create(tenant_id: sonia.id, building_id: eastside.id, complaint_id: other.id, resolved: false, tenant_notes: "Plaster peeling in the bathroom.",  unit: sonias_apartment.unit_number)
pests2 = TenantComplaint.create(tenant_id: sonia.id, building_id: eastside.id, complaint_id: pests.id, resolved: false, tenant_notes: "Aggresive cockroach infestation.", super_notes: "Exterminator scheduled", unit: sonias_apartment.unit_number)

puts "Metro seeded!"
