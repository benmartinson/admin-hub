### Demo Link
https://school-admin-sepia.vercel.app/dashboard/view

--- 

Credentials: <br>
username: benmartinson92@gmail.com <br>
password: **Test123!**

#### Description
This project started as an exploration of what I might build if a school asked me to design a custom learning management system (LMS) tailored to their unique needs, rather than relying on a SaaS edTech solution. The idea was to imagine how an in-house team could deliver a more focused, flexible product.

To keep the scope manageable, I began by developing a Gradebook app as the core feature. Alongside it, I built an administrative interface called 'SchoolAdmin' (this repo) to simplify management tasks and demonstrate how the system could scale to support broader LMS functionality.
<img width="1920" alt="image" src="https://github.com/user-attachments/assets/5ccb40ac-c64d-48e3-8ec8-92afd37970cf" />

#### Gradebook repo
https://github.com/benmartinson/gradebook

#### What I learned
Through this project, I gained hands-on experience with [Convex](https://docs.convex.dev/home), a modern TypeScript backend framework that offers real-time database updates, reducing the need for complex state management on the frontend.

I also built a "Class Assistant" chatbot, which taught me how to integrate with AWS Bedrock, dynamically prompt an LLM with contextual data, and fine-tune its output for specific use cases.

### Features
##### Customizations

Admins can keep track of all the settings that are available for the Gradebook, which fetches these settings and conditionally renders based on them. The idea is that the admin would add settings and then would actually change the Gradebook code to account for them. A future feature would also allow the teacher to switch on/off these settings from within the gradebook.
<img width="411" alt="image" src="https://github.com/user-attachments/assets/efe42382-b4c2-4291-ad84-35a98ee04e93" />

#### AI Class Assistant permissions

More details on the class assistant is available in the Gradebook readme. Basically it's a chatbot that can perform CRUD actions on class data for the teacher. The admin can specify what actions the chatbot is allow to perform for the user.
<img width="409" alt="image" src="https://github.com/user-attachments/assets/87e87969-8618-4a28-8cc7-b0eef0c39a72" />

##### School data

Admins are able to create and manage all class data, student and teacher enrollments in classes. The Gradebook has teachers that that can login and see the custom UI's that the admin has created. The admin controls user accounts from AdminHub.

---

#### Run locally

```
npm install
```

Run backend server:
```
npm run dev:backend
```

then run front end server on different tab, and it should open a browser tab automatically:
```
npm run dev:frontend
```

