import axios from "axios";

export const generatePDF = async (formData, setIsPending) => {
  try {
    setIsPending(true)
    const response = await axios.post('/student/generate-pdf', formData, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: 'application/pdf' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'registration_form.pdf');
    document.body.appendChild(link);
    link.click();
    setIsPending(false);
  } catch (error) {
    setIsPending(false);
    console.error('Error generating the PDF:', error);
  }
};

