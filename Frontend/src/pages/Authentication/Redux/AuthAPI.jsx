export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
     try {
       const response = await fetch(
         '/api/auth/users/register',
         {
           method: 'POST',
           body: JSON.stringify(userData),
           headers: {
             'Content-Type': 'application/json',
           },
         },
       );
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

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
     const response = await fetch(
       '/api/auth/users/login',
       {
         method: 'POST',
         body: JSON.stringify(loginInfo),
         headers: {
           'Content-Type': 'application/json',
         },
         credentials: 'include',
       },
     );
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

export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        '/api/auth/forget-password',
        {
          method: 'POST',
          body: JSON.stringify({ email }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.ok) {
        // const data = await response.json();
        // console.log(response)
        resolve({ response });
      } else {
        const error = await response.json();
        reject(error.message);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function resetPassword(data) {
  const { id, token, newPassword, confirmPassword } = data;
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `/api/auth/forget-password/${id}/${token}`,
        {
          method: 'POST',
          body: JSON.stringify({newPassword, confirmPassword}),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.ok) {
        // const data = await response.json();
        resolve({ response });
      } else {
          const error = await response.json();
          reject(error.message);
      }
    } catch (error) {
      reject(error);
    }
  });
}
