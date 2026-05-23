const byuiCourse = {                        // this whole thing is an object
    code: "WDD231",                         // property 
    name: "Web Frontend Development I",     // property
    sections: [                             // array of section objects
        {
            sectionNumber: 1,
            enrolled: 88,
            instructor: "Brother Bingham",
        },
        {
            sectionNumber: 2,
            enrolled: 81,
            instructor: "Sister Shultz",
        },
        {
            sectionNumber: 3,
            enrolled: 95,
            instructor: "Sister Smith",
        },
    ],
    changeEnrollment: function (sectionNumber, add = true) {        // function, since it's inside an object, it's a method
        // Find the section with the given section number
        const sectionIndex = this.sections.findIndex(
            (section) => section.sectionNumber == sectionNumber
        );
        if (sectionIndex >= 0) {
            if (add) {
                this.sections[sectionIndex].enrolled++;
            } else {
                this.sections[sectionIndex].enrolled--;
            }
        }
    },
};

export default byuiCourse;