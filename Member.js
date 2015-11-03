var members = [];

function Member() {
	this.memberID = Member.counter++;
	this.startDate;
	this.city;
	this.state;
	this.zip;
	this.country;
	this.campaign;
	this.gender;
	this.condition;
	this.contact;
	this.radius;
}

Member.counter = 0;

Member.prototype.importMember = function(sd, c, s, z, country, camp, g, cond, cont, r) {
	console.log("In Member.prototype.impportMember(" + sd +", " + c + ", " + s + ")");
	this.memberID = Member.counter;
	this.startDate = new Date(sd);
	this.city = c;
	this.state = s;
	this.zip = z;
	this.country = country;
	this.campaign = camp;
	this.gender = g;
	this.condition = cond;
	this.contact = cont;
	this.radius = r;
};

Member.prototype.readinCSV = function(filename) {
	
}
