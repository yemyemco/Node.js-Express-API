/* Week 6 Assignment */
const drugs = [

 { id: 1, name: "Amoxicillin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 120, manufacturer: "Pfizer" },

 { id: 2, name: "Paracetamol", category: "Analgesic", dosageMg: 1000, isPrescriptionOnly: false, stock: 200, manufacturer: "GSK" },

 { id: 3, name: "Ibuprofen", category: "Analgesic", dosageMg: 400, isPrescriptionOnly: false, stock: 150, manufacturer: "Bayer" },

 { id: 4, name: "Chloroquine", category: "Antimalarial", dosageMg: 250, isPrescriptionOnly: true, stock: 80, manufacturer: "Sanofi" },

 { id: 5, name: "Ciprofloxacin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 70, manufacturer: "Pfizer" },

 { id: 6, name: "Loratadine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 160, manufacturer: "Novartis" },

 { id: 7, name: "Metformin", category: "Antidiabetic", dosageMg: 850, isPrescriptionOnly: true, stock: 140, manufacturer: "Teva" },

 { id: 8, name: "Artemether", category: "Antimalarial", dosageMg: 20, isPrescriptionOnly: true, stock: 60, manufacturer: "Roche" },

 { id: 9, name: "Aspirin", category: "Analgesic", dosageMg: 300, isPrescriptionOnly: false, stock: 180, manufacturer: "Bayer" },

 { id: 10, name: "Omeprazole", category: "Antacid", dosageMg: 20, isPrescriptionOnly: true, stock: 90, manufacturer: "AstraZeneca" },

 { id: 11, name: "Azithromycin", category: "Antibiotic", dosageMg: 250, isPrescriptionOnly: true, stock: 50, manufacturer: "Pfizer" },

 { id: 12, name: "Cetirizine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 110, manufacturer: "Novartis" },

 { id: 13, name: "Insulin", category: "Antidiabetic", dosageMg: 100, isPrescriptionOnly: true, stock: 30, manufacturer: "Novo Nordisk" },

 { id: 14, name: "Artemisinin", category: "Antimalarial", dosageMg: 100, isPrescriptionOnly: true, stock: 50, manufacturer: "GSK" },

 { id: 15, name: "Codeine", category: "Analgesic", dosageMg: 30, isPrescriptionOnly: true, stock: 20, manufacturer: "Teva" },

 { id: 16, name: "Vitamin C", category: "Supplement", dosageMg: 500, isPrescriptionOnly: false, stock: 300, manufacturer: "Nature’s Bounty" },

 { id: 17, name: "Ranitidine", category: "Antacid", dosageMg: 150, isPrescriptionOnly: false, stock: 90, manufacturer: "Sanofi" },

 { id: 18, name: "Doxycycline", category: "Antibiotic", dosageMg: 100, isPrescriptionOnly: true, stock: 40, manufacturer: "Pfizer" },

 { id: 19, name: "Tramadol", category: "Analgesic", dosageMg: 50, isPrescriptionOnly: true, stock: 45, manufacturer: "Teva" },

 { id: 20, name: "Folic Acid", category: "Supplement", dosageMg: 5, isPrescriptionOnly: false, stock: 250, manufacturer: "Nature’s Bounty" }

];
const PORT = process.env.PORT||5500;    //Use enviromental port or 5500
const express = require('express');     //Load express module
const server = express();

server.use(express.json()); //Responses will be sent as json files

//API to return antibiotic drugs
server.get("/drugs/antibiotics", (req, res)=>
{
     let drugName = []; //To hold antibiotics 
     let a = 0;
     drugs.forEach(()=>{
     //Store drug name where it's an antibiotic 
     //store null where it's not an antibiotic
     (drugs[a].category == "Antibiotic") ? drugName[a] = drugs[a].name :
      drugName[a] = null; 
      a += 1;
     });

//Call lambda function that retains only antibiotics
drugName = drugName.filter((x)=>
{
    return x != null
});

    res.json("In the drugs array, the following are antibiotic drugs: " + drugName);
});

    
//Question 2
//API to return all drug names in lowercase
let b = 0;
server.get("/drugs/names", (req, res)=>
     {
          let newdrugname = drugs.map((x)=>{
          return drugs[b++].name.toLowerCase();
     });
           res.json(newdrugname);  //Shows drug names in lowercase
     });
     
//Question 3
//The Post request receives a cateogry of drugs and shows its respective drugs
//E.g., Send any of the following valid post requests below:
// {"category" : "Antibiotic"}
//{"category" : "Supplement"}
//{"category" : "Antacid"}

server.post("/drugs/by-category", (req, res)=>
{
    const drugCategory = req.body.category;
    let isdrug = []; //To hold drug list 
    let c=0;
    drugs.forEach(()=>
    {
        //Check category requested and store drug names if category exists
        (drugCategory == drugs[c].category) ? isdrug[c] = drugs[c].name :
        isdrug[c] = null;
        c += 1;
    }
    );
    
    //Select drugs
    isdrug = isdrug.filter((x)=>
{
    return x != null
});
//Shows the list of drugs or an error message if category does not exist     
(isdrug.length > 0)? res.json(isdrug) : res.json("Invalid drug category specified");
});

//Question 4
//API retrun an array of each drug and its manufacturer
server.get("/drugs/names-manufacturers", (req, res)=>
{
     let d=0;
     const drugList = [];
     drugs.forEach(()=>
     {
          drugList[d] = [
            [drugs[d].name, drugs[d].manufacturer]
             ];
     d += 1;
     }
     );

     res.json(drugList); //Return drugs and their manufacturers
});
     
//Question 5
//API to show all drugs that require prescription
let prescriptionlist = [];
server.get("/drugs/prescription", (req, res)=>
{
     let e=0;
     drugs.forEach(()=>
     {
          (drugs[e].isPrescriptionOnly == true) ? prescriptionlist[e] = drugs[e].name :
          prescriptionlist[e] == null;
          e += 1;
     });  

     prescriptionlist = prescriptionlist.filter((x)=>
          {
               return x != null
          });

          res.json(prescriptionlist);
});

//Question 6
//API to return new array of drugs
    server.get("/drugs/formatted", (req, res)=>
{
     let f = 0;
     let newArr = [];
     drugs.forEach(()=>
     {
          newArr[f] = "Drug: [" + drugs[f].name + "] - Dosage[" + 
          drugs[f].dosageMg + "]Mg";
          f++;
     });

     res.json(newArr);   //Return all formatted drug names
});

//Question 7
//API to return all drugs with a stock less than 50
server.get("/drugs/low-stock", (req, res)=>
{
     let g = 0;
     var drugList = [];  //To hold list of drugs
     drugs.forEach(()=>{ 
          if(drugs[g].stock < 50)
          {
               drugList[g] = drugs[g].name;  //Select drugs with stock < 50
          }
          else{ drugList[g] = null }    //Null for drugs with 50+ stock
          g += 1;
     });

drugList = drugList.filter((x)=> {return x != null }); //update drug list with only drugs with stock < 50
res.json(drugList);   //Show updated drug list
});
     
//Question 8
//API to show all non-prescription drugs 
let nonprescriptions = [];    //To hold non-prescription drugs
server.get("/drugs/non-prescription", (req, res)=>
{
     let h=0;
     drugs.forEach(()=>
     {    //Show non-prescription drugs
          (drugs[h].isPrescriptionOnly === false) ? nonprescriptions[h] = drugs[h].name :
          nonprescriptions[h] = null;
          h += 1;
     });
     
     nonprescriptions = nonprescriptions.filter((x)=>
     {
          return x != null
     });

     res.json(nonprescriptions);
});


//Question 9
//API to show all drugs by the manufacturer specified
//E.g., send this post message: { "manufacturer" : "Pfizer"} to see all drugs produced by Pfizer
server.post("/drugs/manufacturer-count", (req, res)=>
{
     let k = 0;
     let drugMfd = [];
     const m = req.body.manufacturer;
     //Select drugs based on manufacturer if it exists
     drugs.forEach(()=>
     {
          (drugs[k].manufacturer == m) ? drugMfd[k] = drugs[k].name : 
          drugMfd[k] = null
          k += 1;
     });     

     drugMfd = drugMfd.filter((x)=> { return x != null });
     (drugMfd.length > 0) ? res.json("Drugs produced by " + m + " are " + drugMfd) : 
     res.json("Error! Manufacturer not found!");
});

//Question 10
//API to count drugs that are analgesics
server.get("/drugs/count-analgesics", (req, res)=>
{
     let counter = 0;
     let ctr = 0;
     drugs.forEach(()=>
     {
          if (drugs[ctr].category === "Analgesic")
          {
               counter++; //Count in each analgesic drug case
          } 
          ctr += 1;
     });
     
     res.json("There are " + counter + " analgesic drugs in the list.");
});


//Start the server at the designated port
server.listen(PORT, ()=>{
    console.log("Server is running at...[To stop: Ctrl+C]");
});
