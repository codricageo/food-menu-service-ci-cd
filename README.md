# food-menu-service-ci-cd

A lightweight REST API for managing a food menu, containerised with Docker and continuously delivered to **Amazon ECS** via **Amazon ECR** using GitHub Actions.

---

## API Endpoints

| Method | Path               | Description                    |
|--------|--------------------|--------------------------------|
| GET    | `/health`          | Service health check           |
| GET    | `/menu`            | List all menu items            |
| GET    | `/menu/available`  | List only available items      |
| GET    | `/menu/categories` | List unique item categories    |
| GET    | `/menu/:id`        | Get a single item by ID        |

---

## Local Development

```bash
# Install dependencies
npm install

# Start the server (http://localhost:3000)
npm start

# Run tests with coverage
npm test
```

---

## Docker

```bash
# Build the image
docker build -t food-menu-service .

# Run the container
docker run -p 3000:3000 food-menu-service
```

---

## CI/CD Pipeline (`.github/workflows/ci-cd.yml`)

The pipeline has two jobs:

| Job | Trigger | Steps |
|-----|---------|-------|
| **Test** | Every push / PR | Install → Test |
| **Build & Deploy** | Push to `main` only | Configure AWS → ECR login → Docker build & push → ECS deploy |

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `AWS_ROLE_ARN` | ARN of the IAM role assumed via OIDC (e.g. `arn:aws:iam::123456789012:role/github-actions-role`) |

### Optional GitHub Variables (have sensible defaults)

| Variable | Default | Description |
|----------|---------|-------------|
| `AWS_REGION` | `us-east-1` | AWS region |
| `ECR_REPOSITORY` | `food-menu-service` | ECR repository name |
| `ECS_CLUSTER` | `food-menu-cluster` | ECS cluster name |
| `ECS_SERVICE` | `food-menu-service` | ECS service name |
| `CONTAINER_NAME` | `food-menu-service` | Container name in the task definition |

### AWS Setup

1. **ECR** – Create a repository named `food-menu-service` (or set `ECR_REPOSITORY`).
2. **ECS** – Create a cluster and service whose task definition includes a container named `food-menu-service`.
3. **IAM** – Create an IAM role with an OIDC trust policy for `token.actions.githubusercontent.com` and attach permissions for ECR push and ECS deploy. Store the role ARN as the `AWS_ROLE_ARN` secret.
