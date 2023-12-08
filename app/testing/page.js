const testFunctionalityCronJob = async ()=>{
    // const _id = mongoose.Types.ObjectId(req.body.emp);
    const dt = new Date();
    const day = dt.getDate();
    const month = dt.getMonth()+1;
    const year = dt.getFullYear();
    console.log(dt.toISOString());
    console.log(day,":",month,":",year);

    const allEmployees = await Employee.find({},{_id:1, organisation : 1});
    allEmployees.forEach(async element => {
        console.log(element._id);
        const checkingMorningAttendence = await EmployeeAttendence.findOne(
            {$and:[
                {employee: element._id},
                {day:day},
                {month:month},
                {year:year},
                {$or : [{jobon : 'Marked'},{jobon : 'Absent'},{jobon : 'Official Holiday'},{jobon : 'On Leave'}]},
            ]}
            );
            if(checkingMorningAttendence == null){
                try {
                    const toSave = await EmployeeAttendence({employee:element._id,organisation:element.organisation,jobon:'Absent',joboff:'Absent',attendenceMarkedBy:'Auto',day:day, month:month, year:year});
                    console.log('Today Attendence is not Available, creating Absent for today : ',toSave);
                    const saved = await  toSave.save();
                    if(saved){
                        console.log("employee auto absent market successfully : ",saved);
                    }
                    else{
                        console.log('Failed To Mark Absent.')
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            if(checkingMorningAttendence){
                const checkingEveningAttendence = await EmployeeAttendence.findOne(
                    {$and:[
                        {employee: element._id},
                        {day:day},
                        {month:month},
                        {year:year},
                        {joboff : checkingMorningAttendence.jobon}
                    ]}
                    );
                    if(checkingEveningAttendence == null){
                        try {
                            const updated =  await EmployeeAttendence.findOneAndUpdate({$and:[
                                    {employee: element._id},{day:day},
                                    {month:month},{year:year},
                                    ]},
                                    {
                                    joboff : checkingMorningAttendence.jobon,
                                    attendenceMarkedBy : 'Auto'
                                },{new : true});
                                if (updated) {
                                    console.log('Evening Attendence Auto Mark');
                                }
                                else{
                                    console.log('Failed to Mark Evening Attendence Auto');
                                }
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    else{
                        console.log('Evening and Morning Found Perfectly');
                    }
            }


    });
};