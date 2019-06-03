import { courseConstants, fileConstants, linkConstants } from '../constants';

export default function reducer(
  state = {
    courseFiles: [],
    links: [],
    courseTeachers: [],
    fetchingCourseFiles: false,
    fetchingCourseLinks: false,
    fetchingCourse: false,
    puttingLink: false,
    error: null,
    course: null,
  },
  action,
) {
  switch (action.type) {
    case courseConstants.FETCH_COURSE_FILES: {
      return { ...state, fetchingCourseFiles: true };
    }

    case courseConstants.FETCH_COURSE: {
      return { ...state, fetchingCourse: true };
    }

    case courseConstants.FETCH_COURSE_LINKS: {
      return { ...state, fetchingCourseLinks: true };
    }

    case courseConstants.FETCH_COURSE_TEACHERS: {
      return { ...state, fetchingCourseTeachers: true };
    }

    case courseConstants.FETCH_COURSE_FILES_REJECTED: {
      return { ...state, fetchingCourseFiles: false, error: action.payload };
    }

    case courseConstants.FETCH_COURSE_REJECTED: {
      return { ...state, fetchingCourse: false, error: action.payload };
    }

    case courseConstants.FETCH_COURSE_LINKS_REJECTED: {
      return { ...state, fetchingCourseLinks: false, error: action.payload };
    }

    case courseConstants.FETCH_COURSE_FILES_FULLFILED: {
      return { ...state, fetchingCourseFiles: false, courseFiles: action.payload };
    }

    case courseConstants.FETCH_COURSE_TEACHERS_REJECTED: {
      return { ...state, fetchingCourseTeachers: false, error: action.payload };
    }

    case courseConstants.FETCH_COURSE_FULLFILED: {
      return { ...state, fetchingCourse: false, course: action.payload };
    }

    case courseConstants.FETCH_COURSE_LINKS_FULLFILED: {
      return { ...state, fetchingCourseLinks: false, links: action.payload };
    }

    case courseConstants.FETCH_COURSE_TEACHERS_FULLFILED: {
      return { ...state, fetchingCourseTeachers: false, courseTeachers: action.payload };
    }

    case courseConstants.REMOVE_ACTUAL_COURSE: {
      return { ...state, course: action.payload };
    }

    case fileConstants.FILE_UPLOAD_FULLFILED: {
      return { ...state, courseFiles: [action.payload, ...state.courseFiles] };
    }

    case courseConstants.PUT_COURSE_LINK: {
      return { ...state, puttingLink: true };
    }

    case courseConstants.PUT_COURSE_LINK_FULLFILED: {
      if (state.course && action.payload.link.courseNumber === state.course.courseNumber) {
        return { ...state, puttingLink: false, links: [...state.links, action.payload.link] };
      }

      return { ...state, puttingLink: false };
    }

    case courseConstants.PUT_COURSE_LINK_REJECTED: {
      return { ...state, puttingLink: false, error: action.payload };
    }

    case fileConstants.REMOVE_FILE_REQUEST: {
      return { ...state, deletingFile: true };
    }

    case fileConstants.REMOVE_FILE_FULLFILED: {
      const file = action.payload;
      if (state.course && file.courseNumber === state.course.courseNumber) {
        return {
          ...state,
          deletingFile: false,
          courseFiles: state.courseFiles.filter(e => e.id !== file.id),
        };
      }

      return { ...state, deletingFile: false };
    }

    case linkConstants.REMOVE_FILE_REJECTED: {
      return { ...state, deletingFile: false, error: action.payload };
    }

    case linkConstants.REMOVE_LINK_REQUEST: {
      return { ...state, deletingLink: true };
    }

    case linkConstants.REMOVE_LINK_FULLFILED: {
      const link = action.payload;
      if (state.course && link.courseNumber === state.course.courseNumber) {
        return {
          ...state,
          deletingFile: false,
          links: state.links.filter(e => e.id !== link.id),
        };
      }

      return { ...state, deletingLink: false };
    }

    case linkConstants.REMOVE_LINK_REJECTED: {
      return { ...state, deletingLink: false, error: action.payload };
    }

    default:
      return { ...state };
  }
}
