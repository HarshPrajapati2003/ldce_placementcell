export function saveStudentData(Data) {
  return new Promise(async (resolve, reject) => {
    try {
      const {_id}= Data
      const response = await fetch(`/student/${_id}`, {
        method: 'PUT',
        body: JSON.stringify(Data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error.message);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchStudentData(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/student/student-profile/${id}`);
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error.message);
      }
    } catch (error) {
      reject(error);
    }
  });
}