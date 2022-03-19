const passport = require("passport");
const { google } = require("googleapis");
const people = google.people("v1");

//all google  groups or labels Opperations
const getGroups = () => {
  try {
    return people.contactGroups
      .list({
        groupFields: "clientData,groupType,memberCount,name",
        pageSize: 1000,
      })
      .then((labels) => {
        let data = JSON.parse(JSON.stringify(labels));
        return data.data;
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

//:::::::::::::::get all contact in a givengroup:::::::::::::::::::://
const getContactsInGroup = (resourceName) => {
  try {
    return people.contactGroups
      .get({
        resourceName: resourceName,
        maxMembers: 1000,
      })
      .then((contact) => {
        let data = JSON.parse(JSON.stringify(contact));
        return data.data;
      });
  } catch (error) {
    console.log(error);
  }
};

//::::::::::::::::::Contact Opertations::::::::::::::::://

 createGoogleContact = async (contactDetails) => {
  const { phoneNumber, canonical_phoneNumber, givenName, familyName, email } =
    contactDetails;
  const createdContact = await people.people
    .createContact({
      requestBody: {
        phoneNumbers: [
          {
            value: phoneNumber,
          },
          {
            canonicalForm: canonical_phoneNumber,
          },
        ],
        names: [
          {
            givenName: givenName,
            familyName: familyName,
          },
        ],
        emailAddresses: [
          {
            value: email,
          },
        ],
      },
    })
    .then((data) => JSON.parse(JSON.stringify(data.data)));
  return createdContact;
};

//:::::::::::::::all google contact list::::::::::::::://
const getAllGoogleContacts = () => {
  try {
    return people.people.connections
      .list({
        resourceName: "people/me",
        pageSize: 1000,
        personFields: "names,emailAddresses,phoneNumbers",
      })
      .then((contacts) => {
        let data = JSON.parse(JSON.stringify(contacts));
        return data.data;
      });
  } catch (error) {
    done(error);
  }
};

//::::::::::::::get a  contact usng its googleid::::::::::::::://
const getPersonContactDetails = async (personId) => {
  try {
    return await people.people
      .get({
        resourceName: personId,
        personFields: "names,emailAddresses,phoneNumbers",
      })
      .then((contact) => {
        let data = JSON.parse(JSON.stringify(contact));
        return data.data;
      });
  } catch (error) {
    console.log(error);
  }
};

//:::::::::::::::::modify a given Gruop insert members::::::::::::::::::::://
const modifygroupMembers = async (values) => {
  const {resourceName,resourceNamesToRemove,resourceNamesToAdd}= values;
  try {
    return await people.contactGroups.members
      .modify({ 
        resourceName,
        requestBody: {
          resourceNamesToAdd: [resourceNamesToAdd],
          resourceNamesToRemove: [resourceNamesToRemove],
        },
      })
      .then((data) => {
        console.log(data.data);
        return data;
      });
  } catch (error) {
    console.log(error.message);
  }
};

//:::::::::::::::::modify a given Gruop insert members::::::::::::::::::::://
const deleteGroupMembership = async () => {

  try {
    return await people.contactGroups.members
      .modify({
        resourceName: contactGroupResourcesName,
        requestBody: {
          resourceNamesToAdd: [],
          resourceNamesToRemove: [contactsIds],
        },
      })
      .then((data) => {
        console.log(data.data);
        return data;
      });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {

  createGoogleContact:createGoogleContact,
  removeGruopMember: async (req, res, next) => {

    try {
      //get all current user groups
      await getGroups().then((data) => console.log(data));
      return await deleteGroupMembership().then((data) =>
        res.status(200).json({ code: 200, data: data })
      );
    } catch (error) {}
  },

  modifygroup: async (req, res, next) => {
  
    const{ contactId,contactGroupResourcesName,action } = req.query ;
    console.log(req.query)
    try {
       await modifygroupMembers({resourceName:contactGroupResourcesName, resourceNamesToAdd:[(action=="add"?contactId:null)], resourceNamesToRemove:[(action=="remove"?contactId:null)]
      }).then((data) =>{
        if(data) { 
          return res.status(200).json({code:200,data:data});
      }})
    } catch (error) {
     return  res.status(200).json({ code: 400, data: error })
    }
  },

  create_contact: async (req, res, done) => {
    try {
      let userData = {
        email: "gabriel@gmai.com",
        phoneNumber: "09023085234",
        canonical_phoneNumber: "+2349023085234",
        givenName: "abcd",
        familyName: "cvdf",
      };
      return await createGoogleContact(userData).then((data) =>
        res.status(200).json(JSON.stringify(data))
      );
    } catch (error) {
      done(error);
    }
  },

  getContacts: async (req, res, done) => {
    try {
      const mycontacts = getAllGoogleContacts().then((data) => data);
      mycontacts.then((data) => res.status(200).json(data));
    } catch (error) {
      done(error);
    }
  },

  getLabel: async (req, res) => {
    try {
      let userGoogleContactsGroups = getGroups().then((data) =>
        JSON.parse(JSON.stringify(data))
      );
      userGoogleContactsGroups.then((data) => res.status(200).json(data));
    } catch (error) {
      console.log(error);
    }
  },

  contactInLabel: async (req, res) => {
    console.log(req.query);
    const { resourceName } = req.query;
    try {
      let contactsInGroup = getContactsInGroup(resourceName).then((data) =>
        JSON.parse(JSON.stringify(data))
      );
      contactsInGroup.then((data) => res.status(200).json(data));
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  getPerson: async (req, res) => {
    console.log(req.query);
    try {
      const { resourceName } = req.query;
      let details = getPersonContactDetails(resourceName).then((data) =>
        JSON.parse(JSON.stringify(data))
      );
      details.then((data) => res.status(200).json(data));
    } catch (error) {
      console.log(error);
    }
  },

  create_group: (req, res) => {
    const { groupName } = JSON.parse(JSON.stringify(req.query));

    try {
      //create group or label
      let userGoogleContactsGroups = getGroups().then((data) =>
        JSON.parse(JSON.stringify(data))
      );
      let userGroups = userGoogleContactsGroups.then(({ contactGroups }) => {
        let names = contactGroups.map((group) => `${group.name}`);
        return names;
      });

      userGroups.then(async (data) => {
        if (data.includes(`${groupName}`)) {
          return res.status(301).json({ code: 301, mesage: "group exist" });
        } else {
          try {
            const resp = await people.contactGroups.create({
              requestBody: {
                contactGroup: {
                  name: `${groupName}`,
                },
              },
            });
            res.status(200).json(resp.data);
          } catch (error) {
            res.status(400).json({ code: 400, message: error.messagee });
            console.log(error);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
};
