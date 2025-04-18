```mermaid
graph TD
    %% Frontend
    A[Frontend<br>TypeScript: React/Angular/Vue.js] -->|1. Registration Request| B{Firebase Authentication}
    A -->|2. Login Request| B
    A -->|3. API Request<br>JWT| C{Firebase Cloud Functions}

    %% Firebase Backend
    subgraph Firebase Backend
        B -->|Creates User| D[Firestore<br>Users Collection]
        B -->|Issues JWT| A
        C -->|Validates JWT| B
        C -->|CRUD Operations| D
        C -->|Role-Based Access<br>Custom Claims| B
        E[Firebase Hosting<br>Serves Frontend] --> A
    end

    %% Security
    C -->|Origin Validation<br>maahita.com| F[Middleware<br>Restrict to maahita domains]
    D -->|Security Rules<br>@maahita.com| G[Restricted Access<br>Email Domain Check]
    E -->|CORS Restriction<br>*.maahita.com| H[Domain Whitelisting]

    %% External Services
    B --> I[OAuth Providers<br>Google, Facebook, etc.]

    %% Notes
    classDef firebase fill:#FFCA28,stroke:#000,stroke-width:2px,color:#000;
    class B,C,D,E firebase;
    classDef frontend fill:#BBDEFB,stroke:#000,stroke-width:2px,color:#000;
    class A frontend;
    classDef security fill:#FFCDD2,stroke:#000,stroke-width:2px,color:#000;
    class F,G,H security;
    classDef external fill:#C8E6C9,stroke:#000,stroke-width:2px,color:#000;
    class I external;
```