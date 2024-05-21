# Product Requirements Document (PRD)

## 1. Overview

Objective: Evaluate candidates for the backend developer position based on their proficiency in building high-throughput applications using PostgreSQL, Node.js, and Express, with added features for social media integration and SMS functionality.

## 2. Candidate Profile

Target Role: Backend Developer

Key Skills:
- Proficient in Node.js and Express framework
- Experience with Prisma and other ORMs
- Strong understanding of PostgreSQL
- Experience with RESTful API design
- Familiar with asynchronous programming and promises
- Knowledge of security best practices
- Proficiency in unit testing and integration testing
- Familiarity with version control systems (Git)

### 1. Practical Test

Format: Hands-on coding challenge to build a small game platform.

#### Task:

Objective: Build a small game platform application with high throughput capabilities. Integrate features for collecting phone numbers from social media and providing automatic coin bonuses, along with sending SMS notifications.

Requirements:
1. **User Management**:
    - Create endpoints to register and authenticate users.
    - Store user information securely in PostgreSQL.
    - Forget password implementation and OTP verifications. (BONUS)

2. **Game Mechanics**:
    - Implement basic game functionality (e.g., a simple points-based game).
    - Create endpoints for users to play the game and track their scores.
    - Prevent exploitation using reply attacks.

3. **Coin Bonus System** (BONUS):
    - Automatically credit coins to users whose phone number is provided by a bulk file. The usual bulk size might be 50,000 numbers per 5-minute window.
    - Implement logic to avoid duplicate bonuses.
    - Maintain database connections and load to correctly finish the task without breaking other functionalities.

5. **SMS Notification**:
    - Integrate with an SMS gateway to send notifications to users. API will be provided for this.
    - Manage a queue to monitor delivered and failed notifications.
    - Notify users of their coin bonuses via SMS.

6. **Dashboard**
    - Expose API for dashboard use. Making the dashboard UI is not necessary. 
    - Correctly configure the database for huge inquiries caused by data crunching.
    
7. **Performance and Scalability**:
    - Ensure the application can handle high throughput and concurrent users.
    - Implement measures to optimize performance and database queries.

8. **Testing**:
    - Write unit tests for critical functionalities.
    - Implement integration tests for end-to-end scenarios. (BONUS)

9. **Deployment** (BONUS):
    - Using docker and docker-compose to facilitate application and component deployment
    - Writing IAC

Evaluation Criteria:
- Technical Skills: Depth of knowledge in Node.js, Express, PostgreSQL, and third-party integrations.
- Problem-Solving Ability: Ability to tackle complex problems and implement effective solutions.
- Code Quality: Writing clean, maintainable, and testable code.
- Performance Optimization: Understanding of techniques to handle high throughput and scalability.
- Security: Secure handling of user data and third-party integrations.
- Communication: Clear and effective communication of ideas and solutions.
