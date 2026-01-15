/* eslint-disable max-len */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configure nodemailer with environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.pass,
  },
});

// Triggered on new leave application submission
exports.sendEmailNotification = functions.firestore
    .document("leave_applications/{docId}")
    .onCreate(async (snap) => {
      const applicationData = snap.data();
      const mailOptions = {
        from: functions.config().email.user,
        to: "ugyendendup@yangkhor.com",
        subject: "New Leave Application Submitted",
        text: `
          A new leave application has been submitted by ${applicationData.applicationSubmittedBy}.
          
          Leave Type: ${applicationData.leaveType}
          Number of Days: ${applicationData.numDays}
          Start Date: ${applicationData.startDate.toDate().toLocaleDateString()}
          End Date: ${applicationData.endDate.toDate().toLocaleDateString()}
          Reason: ${applicationData.reason}

          Please review the application in the admin panel.
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to HR.");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    });

// Triggered when admin updates leave application status
exports.sendLeaveStatusEmail = functions.firestore
    .document("leave_applications/{leaveId}")
    .onUpdate(async (change) => {
      const application = change.after.data();
      const {applicationSubmittedBy, leaveType, status} = application;

      const mailOptions = {
        from: functions.config().email.user,
        to: applicationSubmittedBy,
        subject: `Leave Application Status: ${status}`,
        // eslint-disable-next-line max-len
        text: `Dear User,\n\nYour leave application for ${leaveType} has been ${status}.\n\nRegards,\nCompany HR.`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Leave status email sent to ${applicationSubmittedBy}.`);
      } catch (error) {
        console.error("Error sending status update email:", error);
        // eslint-disable-next-line max-len
        throw new functions.https.HttpsError("internal", "Error sending status update email.");
      }
    });
