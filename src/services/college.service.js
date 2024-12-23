import axios from "axios";

const  NEXT_PUBLIC_BACKEND_URL  = process.env.NEXT_PUBLIC_BACKEND_URL;

// Creating a global instance of Axios with default configuration
const axiosInstance = axios.create({
  withCredentials: true,
});

class collegeService {
  constructor() {
    this.url=NEXT_PUBLIC_BACKEND_URL;
  }

  getCollegeById(collegeId) {
    return axiosInstance.get(
      `${this.url}/api/colleges/getcollegefromid/${collegeId}`
    );
  }

  getAllColleges() {
    return axiosInstance.get(`${this.url}/api/colleges/`);
  }
  getAllVerifiedColleges() {
    return axiosInstance.get(`${this.url}/api/colleges/getverifiedcolleges`);
  }
  deleteCollegeById(collegeId) {
    return axiosInstance.delete(`${this.url}/api/colleges/${collegeId}`);
  }
  updateCollegeById(collegeId, collegeDetails) {
    return axiosInstance.put(
      `${this.url}/api/colleges/${collegeId}`,
      collegeDetails
    );
  }

  // Upload logo
  uploadLogo(data) {
    return axiosInstance.post(`${this.url}/api/colleges/uploadlogo`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  //update logo
  updateLogo(collegeId, data) {
    return axiosInstance.post(
      `${this.url}/api/colleges/updatelogo/${collegeId}`,
      data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
   });
  }
}

export default new collegeService();
