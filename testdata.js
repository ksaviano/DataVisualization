var ksaviano = new User();
ksaviano.newaccount("ksaviano", "password");

var mem1 = new Member();
var mem2 = new Member();
var mem3 = new Member();
var mem4 = new Member();
var mem5 = new Member();
var mem6 = new Member();
var mem7 = new Member();
var mem8 = new Member();
var mem9 = new Member();
var mem10 = new Member();

mem1.importMember("4/11/2013", "New York", "NY", "10002", "US", "Affected Adult Women", "Female", "Other", "Same Diagnosis", "50");
mem2.importMember("7/17/2015", "New York", "NY", "10003", "US", "Affected Adult Women", "Female", "PAIS", "Same Diagnosis", "50");
mem3.importMember("4/11/2013", "New York", "NY", "10004", "US", "Affected Adult Women", "Female", "PAIS", "Same Diagnosis", "50");
mem4.importMember("8/16/2015", "NY", "NY", "10009", "US", "Genderfluid Non-Binary Adult", "Gender Fluid", "Swyers", "Same Diagnosis", "50");
mem5.importMember("4/4/2013", "New York", "NY", "10012", "US", "Affected Adult Women", "Female", "CAH", "No Contact", "50");
mem6.importMember("3/9/2013", "New York", "NY", "10025", "US", "Affected Adult Women", "Female", "CAIS", "Same Diagnosis", "50");
mem7.importMember("3/9/2013", "Astoria", "NY", "11103", "US", "Affected Adult Women", "Female", "Unknown", "No Contact", "50");
mem8.importMember("4/7/2013", "Sunnyside", "NY", "11104", "US", "Affected Adult Women", "Female", "Other", "Open", "50");
mem9.importMember("3/24/2013", "Brooklyn", "NY", "11204", "US", "Affected Adult Women", "Female", "CAH", "Open", "50");
mem10.importMember("04/11/13", "Denver", "CO", "80233", "US", "Affected Adult Women", "Female", "PAIS", "Open", "50");

var y = "<tr><th>Member First Associated Date</th><th>City</th><th>State/Province</th><th>Zip/Postal Code</th><th>Country</th><th>Campaign Name</th><th>Gender Identification</th><th>Condition</th><th>ContactType</th><th>Radius</th>";
