import type { ResumeData } from "@/lib/types";

export const RESUME_DATA: ResumeData = {
    name: "HUANG CHENG JIUN",
    initials: "JH",
    location: "Taipei, Taiwan",
    locationLink: "https://www.google.com/maps/place/Taipei",
    about: "Full Stack Engineer dedicated to building high-quality products.",
    summary: <>Full Stack Engineer specializing in high-performance React applications, scalable Node.js services, and real-time collaboration systems. Experienced in technical architecture design and remote team leadership.</>,
    avatarUrl: "https://avatars.githubusercontent.com/u/76590438?v=4",
    personalWebsiteUrl: "https://jarocki.me",
    contact: {
        email: "pocper1@gmail.com",
        tel: "+886905984091",
        social: [
            {
                name: "GitHub",
                url: "https://github.com/pocper1",
                icon: "github",
            },
            {
                name: "LinkedIn",
                url: "https://www.linkedin.com/in/jimmy-cj-huang",
                icon: "linkedin",
            },
        ],
    },
    education: [
        {
            school: "National Taiwan University (NTU)",
            degree: "MBA iN INFORMATiON MANAGEMENT",
            start: "2023",
            end: "2025",
        },
        {
            school: "National Central University (NCU)",
            degree: "BBA iN INFORMATiON MANAGEMENT, MiNOR iN COMPUTER SCiENCE & INFORMATiON ENGiNEERiNG",
            start: "2019",
            end: "2023",
        },
    ],
    work: [
        {
            company: "Appier",
            link: "https://www.appier.com/",
            badges: ["Internship", "Django", "ELK Stack", "APM", "Docker", "RESTful APIs"],
            title: "Backend Engineer Intern - AiQUA",
            start: "Oct. 2024",
            end: "Mar. 2025",
            description: (
                <>
                    <ul className="list-inside list-disc">
                        <li>Built monitoring for backend services using ELK Stack and APM, improving system visibility and log analysis</li>
                        <li>Designed and implemented RESTful APIs in Django for product search by tags, enabling dynamic tag-based filtering and seamless integration across internal services</li>
                        <li>Optimized Dockerfile structure, layer handling, and caching strategies, reducing container build time by 80% and final image size by 40%</li>
                    </ul>
                </>
            ),
        },
        {
            company: "National Taiwan University (NTU) CTLD",
            link: "https://ctld.ntu.edu.tw/",
            badges: ["Internship", "Proxmox VE", "Grafana", "Prometheus", "Infrastructure"],
            title: "Infrastructure Engineer Intern - NTU COOL",
            start: "Jul. 2023",
            end: "Dec. 2024",
            description: (
                <>
                    <ul className="list-inside list-disc">
                        <li>Maintained Proxmox VE infrastructure across multiple datacenters and dozens of servers, ensuring high availability and performance</li>
                        <li>Configured Grafana and Prometheus for real-time metrics and log monitoring; analyzed logs and implemented remediation strategies</li>
                        <li>Ensured rapid recovery by restoring service within 4 hours for a campus of over 30,000 students when issues occurred, demonstrating strong problem-solving and responsibility</li>
                    </ul>
                </>
            ),
        },
        {
            company: "National Yang Ming Chiao Tung University (NYCU) HCRC",
            link: "https://www.nycu.edu.tw/",
            badges: ["Penetration Testing", "Metasploit", "Nmap", "Burp Suite", "Security"],
            title: "Cyber Security Penetration Tester",
            start: "Jun. 2022",
            end: "Oct. 2023",
            description: (
                <>
                    <ul className="list-inside list-disc">
                        <li>Conducted penetration tests on at least five organizations, uncovering and remediating critical vulnerabilities</li>
                        <li>Leveraged Metasploit, Nmap, and Burp Suite to conduct vulnerability discovery and exploit security weaknesses</li>
                        <li>Generated and delivered comprehensive vulnerability reports to stakeholders, guiding remediation efforts and improving security posture</li>
                    </ul>
                </>
            ),
        },
        {
            company: "LINE Taiwan Limited, Central Dev",
            link: "https://linecorp.com/",
            badges: ["Internship", "Kafka", "ELK Stack", "Kubernetes", "DroneCI", "ArgoCD"],
            title: "Software Engineer Intern",
            start: "Jul. 2022",
            end: "Jun. 2023",
            description: (
                <>
                    <ul className="list-inside list-disc">
                        <li>Presented "Tackle the Infodemic of Misinformation from LINE" at LINE Taiwan headquarters to over 30 GDSC members on March 27, 2023</li>
                        <li>Provisioned a full-stack observability system using Kafka and ELK Stack (Logstash, Elasticsearch, Kibana) to monitor microservices</li>
                        <li>Developed CI/CD pipelines in DroneCI and managed Kubernetes deployments with Kustomize and ArgoCD, streamlining infrastructure updates</li>
                    </ul>
                </>
            ),
        },
    ],
    skills: ["Python", "Java", "C++", "Assembly", "Docker", "Kubernetes", "Proxmox VE", "Grafana", "ELK Stack", "CI/CD", "Kafka", "Git", "DroneCI", "ArgoCD", "RESTful APIs", "Django", "Elastic APM", "Network Architecture", "Operating Systems", "System Administration"],
    projects: [
        {
            title: "Elementary Programming Camp - Longyuan Elementary School",
            techStack: ["Scratch", "Education", "Curriculum Design", "Service Learning"],
            description: "Collaborated with principal and teachers to design and implement a Scratch-based programming camp. Applied experiential learning principles to create an engaging curriculum and led workshops teaching Scratch programming to elementary students, receiving positive feedback and fostering enthusiasm for programming.",
            link: {
                label: "Longyuan Elementary School",
                href: "https://www.lyes.tyc.edu.tw/",
            },
        },
    ],
} as const;
