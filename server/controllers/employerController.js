const Employer = require("../models/employerModel");


// =================================
// GET EMPLOYER INTERNSHIPS
// =================================

exports.getEmployerInternships = (req, res) => {

    const employerId = req.params.employerId;


    Employer.getEmployerInternships(
        employerId,
        (err, results) => {


            if(err){

                console.error(err);

                return res.status(500).json({
                    success:false,
                    message:"Unable to fetch internships"
                });

            }


            res.status(200).json({

                success:true,
                internships:results

            });


        }
    );

};



// =================================
// VIEW APPLICATIONS
// =================================

exports.getInternshipApplications = (req,res)=>{


    const internshipId = req.params.internshipId;


    Employer.getInternshipApplications(
        internshipId,
        (err,results)=>{


            if(err){

                console.error(err);

                return res.status(500).json({

                    success:false,
                    message:"Unable to fetch applications"

                });

            }


            res.status(200).json({

                success:true,
                applications:results

            });


        }
    );


};
