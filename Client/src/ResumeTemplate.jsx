import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const ResumeTemplate = ({ resumeData }) => {
  const generatePDF = () => {
    const input = document.getElementById('resume-template');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('resume.pdf');
    });
  };

  return (
    <div>
    <div className="min-h-screen bg-gray-100 py-10 px-5 flex justify-center items-center">
      <div id="resume-template" className="flex r bg-white shadow-lg rounded-lg break-words overflow-hidden bg-opacity-80 backdrop-filter backdrop-blur-lg p-5">
        <div className="w-1/3 bg-gray-800 text-white p-5">
          <div className="flex justify-center items-center mb-6">
            <div className="w-[22vw] h-[18vh] rounded-[50%] border-4 border-white break-words overflow-hidden">
              <img src="/anku.png" alt="Profile" className="w-full h-full object-cover rounded-[50%]" />
            </div>
          </div>
          <div className='text-center'>
            <div className="mb-6">
              <p className="text-lg font-semibold border-b border-white pb-1">Phone</p>
              <p>{resumeData.phone}</p>
            </div>
            <div className="mb-6">
              {/* <p className="text-lg font-semibold border-b border-white pb-1">Email</p> */}
              <p>{resumeData.email}</p>
            </div>
            <div className="mb-6">
              {/* <p className="text-lg font-semibold border-b border-white pb-1">City</p> */}
              <p>{resumeData.city}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 border-b border-white pb-1" 
              style={{color:'white'}}>Education</h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <p>{edu.college}</p>
                  {/* <p className="text-lg font-semibold">Course</p> */}
                  <p>{edu.course}</p>
                  {/* <p className="text-lg font-semibold">From</p> */}
                  <p>{edu.from}</p>
                  {/* <p className="text-lg font-semibold">To</p> */}
                  <p>{edu.to}</p>
                </div>
              ))}
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 border-b border-white pb-1" style={{color:'white'}}>Skills</h2>
              <ul className="list-disc list-inside">
                {resumeData.skills.map((skill, index) => (
                  <li key={index} className="text-lg">{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2 border-b border-white pb-1" style={{color:'white'}}>Languages</h2>
              <ul className="list-disc list-inside">
                {resumeData.languages.map((language, index) => (
                  <li key={index} className="text-lg">{language}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-2/3 p-5">
          <div className="mb-6">
            <p className="text-3xl  text-gray-800 mb-4 text-center font-extrabold">{resumeData.name}</p>
            <p className="text-lg font-semibold border-b border-blue-600 pb-4">Profile</p>
            <p className="text-lg MT-2">{resumeData.profile}</p>

            <h2 className="text-xl font-semibold mb-4 border-b border-blue-600 pb-4">Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className='flex justify-between mr-10'>
                <div>
                <p>{exp.organization}</p>
                <p>{exp.designation}</p>
                </div>
                <div>
                <span>{exp.from}</span> -<span>{exp.to}</span>
                </div>
                </div>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b border-blue-600 pb-4">Additional Fields</h2>
            {resumeData.additionalFields.map((field, index) => (
              <div key={index} className="mb-4">
                <p className="text-lg font-semibold">Title</p>
                <p>{field.title}</p>
                <p className="text-lg font-semibold">Description</p>
                <p>{field.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
      <div className="flex justify-center mt-8">
        <button onClick={generatePDF} className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700">
          Download Resume
        </button>
      </div>
      </div>
  );
};

export default ResumeTemplate;
