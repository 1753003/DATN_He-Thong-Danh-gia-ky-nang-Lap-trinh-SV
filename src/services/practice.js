import axios from 'axios';
import Cookies from 'js-cookie';
import tokenHandling from './tokenHandling';
import Constant from '@/utils/contants';
export function submitMultipleChoice(data) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'POST',
      withCredentials: true,
      url: `${Constant.API}/api/practice/submitcheck`,
      data: data,
      headers: {
        'access-control-allow-origin': Constant.CORS,
        accessToken: Cookies.get('accessToken'),
      },
    };
    axios.request(options)
    .then((response) => {
      // handle success
      // console.log(response.data)
      resolve(response.data);
    })
    .catch((error) => {
      const message = error.response.data.message;
      tokenHandling(message, resolve, options);
    });
  })
}
export function getSubmissionDetailInfo(id, type) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      withCredentials: true,
      url: `${Constant.API}/api/submissions/${type}/${id}`,
      headers: {
        'access-control-allow-origin': Constant.CORS,
        accessToken: Cookies.get('accessToken'),
      },
    };
    axios.request(options)
    .then((response) => {
      // handle success
      // console.log(response.data)
      resolve(response.data);
    })
    .catch((error) => {
      const message = error.response.data.message;
      tokenHandling(message, resolve, options);
    });
  })
}
export function getPracticeListDetail(id) {
  console.log(Cookies.get('accessToken'));
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      withCredentials: true,
      url: `${Constant.API}/api/practice/${id}`,
      headers: {
        'access-control-allow-origin': Constant.CORS,
        accessToken: Cookies.get('accessToken'),
      },
    };
    axios
      .request(options)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        const message = error.response.data.message;
        tokenHandling(message, resolve, options);
      });
  });
}
export function getPracticeSet(set) {

  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      withCredentials: true,
      url: `${Constant.API}/api/practice?set=${set}`,
      headers: {
        'access-control-allow-origin': Constant.CORS,
        accessToken: Cookies.get('accessToken'),
      },
    };
    axios
      .request(options)
      .then((response) => {
        // handle success
        // console.log(response.data)
        resolve(response.data);
      })
      .catch((error) => {
        const message = error.response.data.message;
        tokenHandling(message, resolve, options);
      });
  });
}
export function getSubmissionList(pid, uid) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${Constant.API}/api/practice/submissions?pid=${pid}`, {
        withCredentials: true,
        headers: {
          'access-control-allow-origin': Constant.CORS,
          accessToken: Cookies.get('accessToken'),
        },
      })
      .then((response) => {
        // handle success
        // console.log(response.data)
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        const message = error.response.data.message;
        tokenHandling(message);
      });
  });
}
export function saveSubmissionCoding(pid, jsonData) {
  let tcPassed = 0;
  let total = 0;

  for (var res of jsonData) {
    total += 1;
    res.status_id == 3 ? (tcPassed += 1) : (tcPassed = tcPassed);
  }
  //chromevi123+1@gmail.com
  const submission = {
    SubmissionType: 'Coding',
    PracticeID: pid,
    CorrectPercent: Number((tcPassed / total).toFixed(4)) * 100,
    DoingTime: '100',
    Score: Number(tcPassed / total) * 100,
    Answer: JSON.stringify(jsonData),
    AnsweredNumber: 1,
  };
  return new Promise((resolve, reject) => {
    var options = {
      withCredentials: true,
      method: 'POST',
      url: `${Constant.API}/api/practice/submissions`,
      headers: {
        'access-control-allow-origin': Constant.CORS,
        accessToken: Cookies.get('accessToken'),
      },
      data: submission,
    };
    // console.log('sendcode')
    axios
      .request(options)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        const message = error.response.data.message;
        tokenHandling(message, resolve, options);
      });
  });
}

export function getDiscussion(pid){
  const data = [{
    author: "a",
    avatarSrc: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    time: 123123123,
    content: `This is to display the 
    \`\$\$\c = \\pm\\sqrt{a^2 + b^2}\$\$\`
     in one line
    
    \`\`\`KaTeX
    c = \\pm\\sqrt{a^2 + b^2}
    \`\`\`
    `
  },
  {
    author: "a",
    avatarSrc: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    time:4324121,
    content: "Here's an idea for how you could go from that flat structure to a list of nested comments. Once you're done with that implementation, all you'd need would be a recursive React component.Z"
  }]
  return data;
}