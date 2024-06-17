import { jsPDF } from 'jspdf';

export const generatePDF = (formData) => {
  const General_Information = {
    'First Name': formData.firstName,
    'Middle Name': formData.middleName,
    'Last Name': formData.lastName,
    'Aadhar Number': formData.adharNo,
    'PAN Number': formData.PANNumber,
    'Mobile Number': formData.mobileNo,
    'Email Address': formData.email,
    'Date Of Birth': new Date(formData.dob).toLocaleDateString('en-IN'),
    'Cast Name': formData.cast,
  };

  const Parents_Information = {
    'Father Name': formData.fatherName,
    'Mother Name': formData.motherName,
    'Parents Mobile Number': formData.parentsMobileNo,
  };

  const Residential_Information = {
    Address: formData.address,
    'State Name': formData.state,
    'City Name': formData.city,
    'Pincode Number': formData.pincode,
  };

  const Academic_Information = {
    'Course Name': formData.course,
    'Department Name': formData.department,
    'Passing Year': formData.passingYear,
    'Enrollment Number': formData.enrollmentNumber,
    'HSC Grade': formData.hscPercentage,
    'All Sem SPI': formData.spi.join(', '),
    CPI: formData.cpi,
    CGPA: formData.cgpa,
    'Verification Status': formData.isVerified,
  };

  const doc = new jsPDF();

  // Add company logo
  const logoUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlvIsNI8hPIhXz7Xvy46Tw8m75jzJkZPwaLABiZu1vww&s'; // Replace with your company logo URL
  doc.addImage(logoUrl, 'PNG', 10, 10, 40, 20); // Adjust position and size as needed

  // Add LDCE Placement Cell Registration Form heading
  doc.setFontSize(22);
  doc.setTextColor('#3C50E0');
  doc.text('LDCE Placement Cell Registration Form', 60, 20); // Adjust x-position

  // Add user photo
  const photoUrl = formData.photo;
  if (photoUrl) {
    const userPhoto = new Image();
    userPhoto.src = photoUrl;
    const imageWidth = 40; // Width of the image
    const pdfWidth = doc.internal.pageSize.getWidth(); // Width of the PDF
    const xPos = (pdfWidth - imageWidth) / 2; // Calculate x-position for center
    doc.addImage(userPhoto, 'JPEG', xPos, 40, imageWidth, 40); // Adjust size as needed
  }

  const addSection = (sectionTitle, sectionData, yPos) => {
    // Styling for heading title
    doc.setFillColor('#3C50E0'); // Set fill color
    doc.setDrawColor('#3C50E0'); // Set border color
    doc.setFont('helvetica', 'bold'); // Set font style to bold
    doc.setTextColor('#FFFFFF'); // Set text color to white
    doc.setFontSize(14); // Set font size for heading title
    // Draw heading title with background color and border
    doc.rect(10, yPos, 190, 10, 'F'); // Draw filled rectangle as background
    doc.text(sectionTitle, 15, yPos + 7); // Draw heading title text

    // Add border for the section
    doc.setLineWidth(0.5); // Set border line width
    doc.setDrawColor('#3C50E0'); // Set border color
    const sectionHeight = calculateSectionHeight(sectionData);
    if (yPos + sectionHeight + 20 > doc.internal.pageSize.height) {
      doc.addPage();
      yPos = 20; // Start from the top on a new page
    } else {
      yPos += 10; // Add some space before section content
    }
    doc.rect(10, yPos, 190, sectionHeight+2); // Draw border for the section

    // Reset styles for section content
    doc.setFont('helvetica', 'normal'); // Reset font style
    doc.setFontSize(12); // Reset font size
    doc.setTextColor('#000000'); // Reset text color

    // Add text for each field
    const fields = Object.entries(sectionData);
    const maxLength = Math.max(...fields.map(([key]) => key.length));
    const xOffset = 15 + maxLength * 2 +7 ; // Calculate x offset based on the maximum length of keys
    fields.forEach(([key, value]) => {
      doc.text(`${key}:`, 15, yPos + 10); // Increment y position for each field
      doc.text(value.toString(), xOffset, yPos + 10); // Convert value to string and adjust x position for value
      yPos += 10;
    });

    return yPos; // Return the updated y position
  };

  const calculateSectionHeight = (sectionData) => {
    const fields = Object.entries(sectionData);
    const fieldHeight = 10; // Height of each field
    return fields.length * fieldHeight; // Calculate total height based on the number of fields
  };

  // Initial y position
  let yPos = 90; // Start below the photo

  // Add General Information section
  yPos = addSection('General Information', General_Information, yPos);
  yPos += 10;
  // Add Parents Information section
  yPos = addSection('Parents Information', Parents_Information, yPos);
  yPos += 10;
  // Add Residential Information section
  yPos = addSection('Residential Information', Residential_Information, yPos);
  yPos += 10;
  // Add Academic Information section
  yPos = addSection('Academic Information', Academic_Information, yPos);
  yPos += 10;
  // Save the PDF
  doc.save('registration_form.pdf');
};
