export const StatusUpdateEmail = ({ user, status, userType }) => {
  const isApproved = status === "approved";

  return `
    <!DOCTYPE html>
    <html>
      <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <p>Dear ${user.fullName},</p>
          ${
            isApproved
              ? `
            <p>Congratulations! Your farmer account has been approved. You can now access all features of our platform.</p>
           
          `
              : `
            <p>We regret to inform you that your farmer account application has been rejected. If you believe this is an error, please contact our support team.</p>
          `
          }
          <p>Best regards,<br/>Annatripti Team</p>
        </div>
      </body>
    </html>
  `;
};
