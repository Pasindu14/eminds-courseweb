"use server";
import { errorMessage } from "@/constants/messages";
import ResponseHandler from "../models/response.model";
import { deleteHtmlFile, uploadFile, uploadHtmlContent } from "./file.actions";
import { supabaseCacheFreeClient } from "../server";
import { revalidatePath } from "next/cache";
import { cpdmBadgeImage, cpdmBadgeImageSL, cpdmOGBadgeImage, dpdmBadgeImage, dpdmBadgeImageSL, dpdmOGBadgeImage, emindsLogo, profileDetailsPath } from "@/constants/badge";
import { fetchStudentByAutoid } from "./student.actions";
import { getCourseByAutoId } from "./course.actions";


export async function fetchBadges(): Promise<any> {

  let { data: student_badges, error } = await supabaseCacheFreeClient
    .from('student_badge')
    .select(`* , students(name,phonenumber) , courses(course_name)`)

  if (error) {
    return [];
  }

  return student_badges;
}

const headTags = (courseCode: any) =>
  `
<head>
<!-- Required meta tags -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Eminds Profile">
<meta name="keywords" content="Bitlabs">
<meta name="author" content="Bitlabs">


<!-- Facebook and Twitter integration -->
<meta property="og:title" content="${courseCode == "CPDM" ? "Certificate in Practical Digital Marketing, " : "Diploma In Practical Digital Marketing, "}eMinds Certified Digital Marketing Specialist">
<meta property="og:image" content="${courseCode == "CPDM" ? cpdmOGBadgeImage : dpdmOGBadgeImage}">
<meta property="og:url" content="">
<meta property="og:site_name" content="Eminds CourseWeb">
<meta property="og:description" content="">
<meta name="twitter:title" content="">
<meta name="twitter:image" content="">
<meta name="twitter:url" content="">
<meta name="twitter:card" content="">

<!-- App favicon -->
<link rel="shortcut icon" href="../assets/images/favicon.ico">

<!-- Bootstrap CSS -->
<link rel="stylesheet" href="https://courseweb.eminds.lk/assets/css/bootstrap.min.css">
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">


<style>
body {
  color: #585c7b;
  font-family: 'Roboto', sans-serif;
}
h1, h2, h3, h4, h5, h6 {
  font-family: 'Roboto', sans-serif;
  color: #131022;
}
.main-nav {
  z-index: 2;
  position: relative;
}
.template-hero {
  padding-top: 100px;
  padding-bottom: 100px
}
.background-hero {
  background-image:url(https://courseweb.eminds.lk/profile/img/bg-2.png);
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button {
  padding: 10px 18px;
  margin-bottom: 30px;
  background: #fff;
  color: #222;
  border: 0;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
}
.button-group {
  justify-content: center;
  text-align: center;
}
.wrap-bg {
  background-color: #fcf0e3;
}
.button:hover {
  color: #ff5e14;
  outline: none;
}
.button:active, .button.is-checked {
  color: #ff5e14;
  outline: none;
}
.button.is-checked {
  color: #ff5e14;
}
.element-item {
  margin: 30px;
  background: #fff;
}
.element-item img {
  max-width: 370px;
  height: auto;
  border-radius: 20px;
}
.icon-square {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.back-img {
  position: relative;
  position: relative;
  left: -43px;
}
.icon-top {
  position: relative;
  top: -3px;
  left: 23px;
  z-index: 2;
  font-size: 38px;
  color: #333;
}
.back-image-one {
  background-image: url(../img/66.png), url(../img/55.png);
  background-position: right bottom, left top;
  background-repeat: no-repeat, no-repeat;
}
.back-image-two {
  background-image: url(../img/88.png), url(../img/77.png);
  background-position: right bottom, left top;
  background-repeat: no-repeat, no-repeat;
}
.back-image-three {
  background-image: url(../img/99.png);
  background-position: right bottom;
  background-repeat: no-repeat;
}
.back-image-four {
  background-image: url(../img/5.png), url(../img/4.png);
  background-position: right bottom, left top;
  background-repeat: no-repeat, no-repeat;
}
.back-image-five {
  background-image: url(../img/7.png), url(../img/6.png);
  background-position: right center, left center;
  background-repeat: no-repeat, no-repeat;
}
.back-image-six {
  background-image: url(../img/8.png), url(../img/9.png);
  background-position: right bottom, left top;
  background-repeat: no-repeat, no-repeat;
}
.back-image-seven {
  background-image: url(../img/10.png);
  background-position: right bottom;
  background-repeat: no-repeat;
}
.owl-carousel.gap-small .owl-dots {
  margin-top: 1rem;
}
.owl-carousel .owl-dots {
  text-align: center;
}
.owl-carousel .owl-dots .owl-dot.active span {
  transform: scale(1);
  background: 0 0;
  border-color: #aab0bc;
}
.owl-carousel .owl-dots .owl-dot span {
 width: .7rem;
 height: .7rem;
 margin: 0 .3rem;
  background: #aab0bc;
  opacity: .5;
  display: block;
  -webkit-backface-visibility: visible;
  transition: all .2s ease-in-out;
  border-radius: 100%;
  transform: scale(.6);
  border: 3px solid transparent;
}

.lead2 {
  font-size:26px;
}
.vv {
  position: relative;
}
.vv img {
  transition: all 0.3s ease;
  cursor: pointer;
}
.vv img:hover {
  opacity: 0.8;
  transform: scale(1) translateZ(0);
  box-shadow: 0px 0px 5px 8px rgba(0,0,0,0.08);
}
.date {
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 2;
  display: inline-block;
  background-color: #1cbe59;
  border-radius: 12px;
  text-align: center;
  padding: 13px 19px 12px;
  line-height: 1;
}
.date h3 {
  font-size: 24px;
  color: #fff;
  font-family: inherit;
  line-height: 1.2;
  margin-bottom: 2px;
}
.date span {
  font-size: 14px;
  color: #fff;
}
::placeholder {
font-size:15px;
font-weight:600;
}
.bb {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.embed-responsive {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
}
.nav-sticky {
  background: #ffffff;
  margin-top: 0px;
  box-shadow: 0px 3px 10px 0px rgb(63 58 100 / 8%);
  padding: 0;
}
.navbar {
  transition: all 0.5s ease;
  font-family: 'Jost', sans-serif;
}
.navbar .navbar-nav {
  padding: 20px 0;
}
.navbar .navbar-nav .nav-link {
  font-size: 16px;
  padding: 0 24px;
  font-weight: 600;
}
.navbar-collapse {
  padding: 0;
}
@media (max-width: 990px) {
.nav-sticky {
  padding: 10px 0;
}
.navbar .navbar-nav {
  padding: 0;
  padding-top: 3px;
}
.navbar-collapse ul li {
  border-bottom: 1px solid #ddd;
  display: block;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #FFF;
  text-align: center;
}
.navbar-collapse ul li:first-child {
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
}
.navbar-collapse ul li:last-child {
  border-bottom: none;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}
}
@media (max-width:700px) {
.icon-square {
  display: none;
}
.back-image-five {
  background-image: none;
}
.lead2 {
  font-size: 22px;
}
.element-item {
  margin: 10px;
  background: #fff;
}
.element-item img {
  max-width: 350px;
}
.button {
  margin-bottom: 1px;
}
}
:target::before {
  content: '';
  display: block;
  height: 180px;
  margin-top: -180px;
}
li.active a {
  color: #dc3545 !important;
}
.owl-carousel .owl-item img {
  display: block;
  width: 50px;
  height: auto;
  margin: 0 auto;
  padding-bottom: 20px;
}
.student-badge {
  cursor: pointer;
}

.badge-font-custom {
  font-size:22px !important;
  font-weight: 100 !important;
  background-color: #3051d3b5 !important;
}

.default-margin-top{
  margin-top: 10%;
}
</style>
<title>Eminds Profile</title>
</head>`;

const generateCPDMHtmlContent = (name: string, courseCode: string, studentId: number, badgeType: string) => {
  return `<html lang="en">
    
    ${headTags(courseCode)}
    
    <body><nav class="navbar navbar-expand-lg navbar-light fixed-top sticky" id="navbar">
    <a class="navbar-brand" href="#">
    <img src="${emindsLogo}" width="7%" height="7%" alt="">
    </a>
    </nav>
    
    <div class="background-hero" id="home">
    <div class="container default-margin-top">
    <div class="row align-items-start mb-4">
      <div class="col-lg-4 text-center pb-lg-0 pb-5">
        <img src="${badgeType == "AUS" ? cpdmBadgeImage : cpdmBadgeImageSL}" class="img-fluid w-100" id="profile-image">
        <h1 class="fw-bold student-name mt-4 mb-4"><a href="http://courseweb.eminds.com.au/profile/${studentId}">${name}</a></h1>
    
        <div class="d-flex justify-content-center">
          <h4>Type :<small> Validation</small></h4>
        </div>
        <hr style="width:30%;">
    
        <div class="d-flex justify-content-center">
          <h4>Level :<small> Foundation</small></h4>
        </div>
        <hr style="width:30%;">
    
        <div class="d-flex justify-content-center">
          <h4>Time :<small> Day</small></h4>
        </div>
        <hr style="width:30%;">
    
        <div class="d-flex justify-content-center">
          <h4>Cost :<small> Paid</small></h4>
        </div>
        <hr style="width:30%;">
      </div>
      <div class="col-lg-8 text-left pl-4 pr-4">
        <div class="row">
          <h1>CPDM : Certificate in Practical Digital Marketing, eMinds Certified Digital Marketing Specialist</h1>
        </div>
        <div class="row">
          <p class="lead mt-3">CPDM is eMinds global practical digital marketing education program for digital marketing professionals. This badge holder is a valued partner who is qualified and skilled enough to handle a digital marketing executive, senior executive or specialist position. </p>
        </div>
    
        <div class="row mt-5">
          <h5>Skills</h5>
        </div>
    
        <div class="row">
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Digital marketing strategy and planning</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Facebook business manager and campaign set ups</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Facebook audience building</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Facebook pixels</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Google search ads</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Google display ads</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Youtube ads</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">SEO</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Linkedin ads</span>
        </div>
    
        <div class="row mt-5">
          <h5>Earning Criteria</h5>
        </div>
    
        <div class="row">
          <div class="d-flex justify-content-start align-items-start">
            <div class="mr-1">
              <i class="fa fa-id-card fa-fw" aria-hidden="true"></i>
            </div>
            <div>
              <p class="lead">This badge indicates a candidate has successfully completed an in-depth eMinds training workshop developed in partnership CPD UK and TVEC. This rigorous, hands-on workshop focuses on training and facilitation skills to empower digital marketers to help brand to drive results by following best digital marketing tactics. </p>
            </div>
          </div>
    
          <div class="d-flex justify-content-start align-items-start">
            <div class="mr-1">
              <i class="fa fa-id-card fa-fw" aria-hidden="true"></i>
            </div>
            <div>
              <p class="lead">Badged candidates can deliver digital marketing services to various groups, including (but not limited to): small businesses, private and public sectors, nonprofits, and marketers.</p>
            </div>
          </div>
        </div>
    
        <div class="row mt-5">
          <h5>Standard</h5>
        </div>
    
        <div class="row">
          <p class="lead">Candidates must adhere to these to conditions to remain in the program <br>--Maintain an active eMinds professional certification <br>--Join with monthly training programs</p>
        </div>
    
      </div>
    </div>
    </div>
    </div>
    
    <div class="bg-light mt-5">
    <div class="container">
    <div class="row py-4">
      <div class="col-lg-12 text-center">
        <p class="mb-0 pb-0">Developed by Bitlabs </p>
      </div>
    </div>
    </div>
    </div>
    </body></html>';`;
};

const generateDPDMHtmlContent = (name: string, courseCode: string, studentId: number, badgeType: string) => {
  return `<html lang="en">
    ${headTags(courseCode)}
    
    <body><nav class="navbar navbar-expand-lg navbar-light fixed-top sticky" id="navbar">
    <a class="navbar-brand" href="#">
    <img src="${emindsLogo}" width="7%" height="7%" alt="">
    </a>
    </nav>

    <div class="background-hero" id="home">
    <div class="container default-margin-top">
    <div class="row align-items-start mb-4">
      <div class="col-lg-4 text-center pb-lg-0 pb-5">
        <img src="${badgeType == "AUS" ? dpdmBadgeImage : dpdmBadgeImageSL}" class="img-fluid w-100" id="profile-image">
        <h1 class="fw-bold student-name mt-4 mb-4"><a href="http://courseweb.eminds.com.au/profile/${studentId}">${name}</a></h1>
    
        <div class="d-flex justify-content-center">
          <h4>Type :<small> Validation</small></h4>
        </div>
        <hr style="width:30%;">
    
        <div class="d-flex justify-content-center">
          <h4>Level :<small> Advance </small></h4>
        </div>
        <hr style="width:30%;">
    
        <div class="d-flex justify-content-center">
          <h4>Time :<small> Days</small></h4>
        </div>
        <hr style="width:30%;">
    
        <div class="d-flex justify-content-center">
          <h4>Cost :<small> Paid</small></h4>
        </div>
        <hr style="width:30%;">
      </div>
      <div class="col-lg-8 text-left pl-4 pr-4">
        <div class="row">
          <h1>DPDM : Diploma in Practical Digital Marketing, eMinds Certified Digital Marketing Lead</h1>
        </div>
        <div class="row">
          <p class="lead mt-3">DPDM is eMinds global practical digital marketing education program for digital marketing professionals who are in the managerial leval.  This badge holder is a valued partner who is qualified and skilled enough to handle a digital marketing manager and above positions. </p>
        </div>
    
        <div class="row mt-5">
          <h5>Skills</h5>
        </div>
    
        <div class="row">
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Digital marketing strategy and planning</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Facebook business manager and campaign set ups</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Facebook audience building</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Facebook pixels</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Google search ads</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Google display ads</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Youtube ads</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">SEO</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Discovery commerce</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Facebook event manager and conversion ads</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Google conversion ads</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Google tag manager</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Advance SEO</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Across boarder marketing</span>
          <span class="badge badge-primary badge-font-custom mr-1 mb-1">Facebook experiments</span>
        </div>
    
        <div class="row mt-5">
          <h5>Earning Criteria</h5>
        </div>
    
        <div class="row">
          <div class="d-flex justify-content-start align-items-start">
            <div class="mr-1">
              <i class="fa fa-id-card fa-fw" aria-hidden="true"></i>
            </div>
            <div>
              <p class="lead">This badge indicates a candidate has successfully completed an in-depth eMinds training workshop developed in partnership CPD UK and TVEC. This rigorous, hands-on workshop focuses on training and facilitation skills to empower digital marketers to help brand to drive results by following best digital marketing tactics. </p>
            </div>
          </div>
    
          <div class="d-flex justify-content-start align-items-start">
            <div class="mr-1">
              <i class="fa fa-id-card fa-fw" aria-hidden="true"></i>
            </div>
            <div>
              <p class="lead">Badged candidates can deliver digital marketing services to various groups, including (but not limited to): small businesses, private and public sectors, nonprofits, and marketers.</p>
            </div>
          </div>
        </div>
    
        <div class="row mt-5">
          <h5>Standard</h5>
        </div>
    
        <div class="row">
          <p class="lead">Candidates must adhere to these to conditions to remain in the program <br>--Maintain an active eMinds professional certification <br>--Join with monthly training programs</p>
        </div>
    
      </div>
    </div>
    </div>
    </div>
    
    <div class="bg-light mt-5">
    <div class="container">
    <div class="row py-4">
      <div class="col-lg-12 text-center">
        <p class="mb-0 pb-0">Developed by Bitlabs © 2022</p>
      </div>
    </div>
    </div>
    </div>
    
    </body></html>`;
};

export async function addBadge(badge: FormData, fileFormData: FormData) {
  const responseHandler = new ResponseHandler<any>();

  try {
    const jsonResponse = await uploadFile(fileFormData);

    if (jsonResponse.success !== true) {
      return responseHandler.setError(
        jsonResponse.message ?? errorMessage
      );
    }

    const courseId = badge.get('course_auto_id');
    const studentId = badge.get('students');
    const badgetType = badge.get('badge_type') as string;

    // Check if badge already exists
    const { data: existing, error: existingError } = await supabaseCacheFreeClient
      .from('student_badge')
      .select()
      .eq('course_auto_id', courseId)
      .eq('student_auto_id', studentId)
      .maybeSingle();

    if (existingError) {
      return responseHandler.setError(existingError.message);
    }

    if (existing) {
      return responseHandler.setError('Badge already exists for this student and course');
    }

    const fileId = jsonResponse.file_id;

    const { data: newBadge, error } = await supabaseCacheFreeClient
      .from('student_badge')
      .insert(
        {
          student_auto_id: studentId,
          course_auto_id: courseId,
          image_name: fileId
        }
      ).select();

    const id = newBadge?.[0].auto_id;

    if (error) {
      return responseHandler.setError(error.message);
    }

    const [studentDetails, courseDetails] = await Promise.all([
      fetchStudentByAutoid(studentId!.toString()),
      getCourseByAutoId(courseId!.toString())
    ]);

    let result;
    if (courseDetails.course_code === 'DPDM') {
      const html = generateDPDMHtmlContent(studentDetails.name, courseDetails.course_code, studentDetails.auto_id, badgetType);
      result = await uploadHtmlContent(html);

      if (!result.success) {
        return responseHandler.setError(result.message);
      }
      updateBadge(id!, result.filePath);
    } else {
      const html = generateCPDMHtmlContent(studentDetails.name, courseDetails.course_code, studentDetails.auto_id, badgetType);

      result = await uploadHtmlContent(html);

      if (!result.success) {
        return responseHandler.setError(result.message);
      }
      updateBadge(id!, result.filePath);
    }

    revalidatePath('/badges', 'page');

    return responseHandler.setSuccess("Badge added successfully", result);

  } catch (error: any) {
    return responseHandler.setSuccess(error.message);
  }

}

async function updateBadge(auto_id: number, link: string) {

  const { error } = await supabaseCacheFreeClient
    .from('student_badge')
    .update({ link: link })
    .eq('auto_id', auto_id)
    .select()

  if (error) {
    throw error;
  }

}

export async function deleteBadgeById(id: string, fileId: string) {
  const responseHandler = new ResponseHandler<any>();
  try {
    const { error } = await supabaseCacheFreeClient
      .from('student_badge')
      .delete()
      .eq('auto_id', id)

    if (error) {
      return responseHandler.setError(error.message);
    }

    const deleteResult = await deleteHtmlFile(
      fileId
    );

    if (deleteResult.success !== true) {
      return responseHandler.setError(deleteResult.message);
    }

    revalidatePath('/badges', 'page');
    revalidatePath('/expire-badges', 'page');
    return responseHandler.setSuccess("Badge deleted successfully");

  } catch (error: any) {
    return responseHandler.setSuccess(error.message);
  }
}

export async function fetchBadgesByStudentAutoId(student_auto_id: number) {

  let { data: studentBadges, error } = await supabaseCacheFreeClient
    .from('student_badge')
    .select(`*, courses!inner(auto_id, course_code, course_name,badge)`)
    .eq('student_auto_id', student_auto_id);

  if (error) {
    return [];
  }

  return studentBadges ?? [];

}

export async function getStudentBadgesOlderThan3Years() {
  try {
    let { data, error } = await supabaseCacheFreeClient
      .from('student_badge')
      .select('* , courses!inner(auto_id, course_code, course_name,badge),students!inner(name,phonenumber)')
      .lte('created_date', new Date(new Date().setFullYear(new Date().getFullYear() - 3)).toISOString());

    if (error) {
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error('Error fetching student badges:', error);
    return [];
  }
}

export async function deleteBadgesByIds(ids: string[]) {
  const responseHandler = new ResponseHandler<any>();
  try {

    let { data: links, error } = await supabaseCacheFreeClient
      .from('student_badge')
      .select('link')
      .in('auto_id', ids)

    if (error) {
      return responseHandler.setError(error.message);
    }

    const { error: deleteError } = await supabaseCacheFreeClient
      .from('student_badge')
      .delete()
      .in('auto_id', ids);

    if (error) {
      return responseHandler.setError(deleteError?.message ?? errorMessage);
    }

    if (links != null) {
      for (const link of links) {
        const deleteResult = await deleteHtmlFile(
          link.link
        );
        if (deleteResult.success !== true) {
          return responseHandler.setError(deleteResult.message);
        }

      }
    }
    revalidatePath('/badges', 'page');
    revalidatePath('/expire-badges', 'page');
    return responseHandler.setSuccess("Badges deleted successfully");

  } catch (error: any) {
    return responseHandler.setError(error.message || "An unexpected error occurred");
  }
}
