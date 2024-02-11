# Z-teknologsektionen's website [ztek.se](https://ztek.se)

This project is used to build Z-Teknologsektionen's website. It was bootstrapped with [create-t3-app](https://create.t3.gg/). The application is a fullstack application built with the following technologies:

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [ShadCn](https://ui.shadcn.com)

and deployed with [Vercel](https://create.t3.gg/en/deployment/vercel). The website contains information about the student division, life as a student at Z, the board, the different committees and the events that are being held. It is managed by [Webbgruppen](mailto:webbgruppen@ztek.se) which also are responsible for the development of the website.

This guide is created to help new member of Webbgruppen to get started with the project and to understand how the project is built and how it works. The guide is divided into different sections where each section explains a different part of the project. It assumes that you have no prior knowledge of the different technologies used in the project and is written to be easy to understand. If you have any questions or need help with anything, feel free to reach out to the other members of Webbgruppen.

## Getting started

### Prerequisites

Before you can run this project, you need to have the following installed:

- Node.js: Next.js requires Node.js to run. You can download it from the [official Node.js website](https://nodejs.org/). The LTS (Long Term Support) version is recommended.

- npm: npm is the package manager for Node.js and is used to install Next.js and other dependencies. npm is included with Node.js, so you don't need to install it separately.

- Git: You will need Git to clone the project's repository. You can download it from the [official Git website](https://git-scm.com/).

After installing the prerequisites, you can clone the project's repository with the following command:

```sh
git clone https://github.com/Z-Teknologsektionen/ztek.git
```

To be able to access the github repository, you need to be a member of the organization Z-Teknologsektionen. If you are not a member, you can request access from Ztyret.

Finally, install the project's dependencies with the following command:

```sh
npm install or npm i
```

and run the project with

```sh
npm run dev
```

The application might return an error when connecting to the database because no valid environment file is present. Look at `.env.example` and create a copy of it. Rename it to `.env` and fill it with the correct values. For more information, see [this link](https://www.prisma.io/docs/reference/database-reference/connection-urls#env).

```.env
DATABASE_URL=""

#Next Auth
NEXTAUTH_URL=''
NEXTAUTH_SECRET=''

#Next Auth Google Login
GOOGLE_CLIENT_ID=''
GOOGLE_CLIENT_SECRET=''
```

This is what the current `.env` file looks for this project. Reach out to other members to get the correct values.

Now you should be able to run the project and connect to all relevant databases.

### File Structure

A typical Next.js project has a specific file structure. Here's a brief overview of the main directories and files you'll find in a Next.js project and their roles:

- `src/pages/`: This directory contains all the page components. Each file corresponds to a route based on its name. For example, `pages/about.tsx` is mapped to `www.ztek.se/about`. The special file `pages/_app.tsx` is used to initialize pages, and `pages/_document.tsx` is used for server-side rendering.

- `public/`: The public directory is used to serve static files. Files within this directory are accessible at `www.ztek.se/filename`. Usually images and pdf-documents are placed here.

- `src/styles/`: This directory is often used for global styles.

- `src/components/`: All custom components are placed in here. These components can be reused across different pages.

- `node_modules/`: This directory is where npm packages are stored after you run `npm install`.

- `package.json`: This file contains metadata about the project and its dependencies.

- `package-lock.json`: These files lock the versions of the dependencies to ensure consistency across environments.

- `.next/`: This is the output directory of the Next.js build process. It's created when you run `next build`.

- `next.config.js`: This is the configuration file for Next.js. You can adjust the behavior of your Next.js app by modifying this file.

- `.env`: This file is used to define environment variables. This is needed to keep sensitive information like API keys and database credentials out of your codebase.

#### How Files are Connected

The `src/pages/` directory is the heart of a Next.js application. Each file in this directory corresponds to a route in your application. These files import and use components from the `src/components/` directory or any other directory you choose to structure your components in.

```
src
├── pages
│   ├── active
│   ├── api
│   ├── student
│   ├── student-division
....
```

These are the base routes for the project, each corresponding to a part of the website. The different routes can be accessed from the Navbar on the website. The `active` route is used to administer the different parts of the site and you need to be logged in to access this route.

The `api` route is used to setup the tRPC and NextAuth api.

The `student` route is used to display information only relevant to students and not related to the student division. Here information about applying for Z and other student related information is displayed.

The `student-division` route is used to display the different student division committees and how to apply for them.

The different routes may contain subroutes such as `student-division/zaloonen`. The page rendered when you visit `ztek.se/student-division` is rendered from the `index.tsx` file placed in the `student-division` folder. This enables the application to have a base route and subroutes. Within the folder, there is also a file named `zaloonen.tsx` which is displayed at the route `ztek.se/student-division/zaloonen`. So `index.tsx` in any folder corresponds to the folder name while another filename corresponds to the filename.

#### Dynamic routes

Sometimes we don't know the route, as it might depend on a name defined in some database. In this project this happens for committees at `src/pages/student-division/committees/[slug]`. Here the brackets indicate that the route is dynamic and the slug of the committee is used to display a specific commitee. Each committee has the same layout, but the text and images are changed.

#### Using different components

The different routes are built mainly with different components such as the `<SectionWrapper>` component. This component is used to wrap the different sections of the website and is used to keep the same layout across the different routes. The `<SectionWrapper>` component is used to wrap the different sections of the website and is used to keep the same layout across the different routes. Looking at the component, we can see that it has different margins for different screensizes, making the website nice both for computers and phones. This component should be wrapped around every different page.

```tsx
import {
  type DetailedHTMLProps,
  type FC,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";
import { cn } from "~/utils/utils";

interface ISectionWrapper
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  a?: boolean;
}

const SectionWrapper: FC<PropsWithChildren<ISectionWrapper>> = ({
  children,
  className = "",
  ...rest
}) => {
  return (
    <section
      className={cn(
        "mx-auto max-w-7xl space-y-8 px-4 py-16 md:px-6 xl:px-4",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
};

export default SectionWrapper;
```

Another component that is widley used is the `<SectionTitle>` component. This component is used to display the title of the different sections of the website. It is used to keep the same layout across the different routes. This component should be used to display the title of the different sections of the website.

```tsx
import {
  type DetailedHTMLProps,
  type FC,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";
import { cn } from "~/utils/utils";

interface ISectionTitle
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  center?: boolean;
}

const SectionTitle: FC<PropsWithChildren<ISectionTitle>> = ({
  children,
  center,
  className = "",
  ...rest
}) => {
  return (
    <h1
      className={cn(
        `text-3xl font-semibold`,
        center ? "text-center" : "",
        className,
      )}
      {...rest}
    >
      {children}
    </h1>
  );
};

export default SectionTitle;
```

It's a simple component, but by using `<Sectiontitle>` instead of writing this code every time, we can keep the same layout across the different routes and change it easily if we want to. This is a good example of how to use components to keep the same layout across the different routes and keeps the code clean and easy to read. This also keeps the code in the routes short, for example in `src/pages/student-division/index.tsx`:

```tsx
import { CommitteeType } from "@prisma/client";
import { type GetStaticProps, type NextPage } from "next";
import CommitteeLayout from "~/components/committees/CommitteeLayout";
import HeadLayout from "~/components/layout/HeadLayout";
import SecondaryTitle from "~/components/layout/SecondaryTitle";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import ssg from "~/server/api/helpers/ssg";
import { api } from "~/utils/api";
import { getCommitteeTypeStringFromEnum } from "~/utils/getCommitteeTypeStringFromEnum";

const Home: NextPage = () => {
  const { data: committees } = api.committee.getAll.useQuery();

  return (
    <>
      <HeadLayout title="Organ" />
      <main>
        <SectionWrapper>
          <SectionTitle className="mb-8" center>
            Sektionsorgan
          </SectionTitle>
          <div>
            Sektionen består av flera olika organ som alla har olika uppgifter.
            Kommittéer är organ som har en egen ekonomi och som har en specifik
            uppgift. Utöver kommittéer finns det även utskott som är organ som
            inte har en egen ekonomi och som har lite mindre uppgifter.
            Sektionen kan också tillsätta tillfälliga arbetsgrupper för att
            utreda specifika frågor. För att läsa mer om de olika organen kan du
            klicka på dem nedan.
          </div>

          {Object.values(CommitteeType).map((committeeType) => {
            const filterdCommitteesByType = committees?.filter((committee) => {
              return committee.committeeType === committeeType;
            });
            if (filterdCommitteesByType?.length === 0) return null;
            return (
              <div key={committeeType}>
                <SecondaryTitle className="mb-4" center>
                  {getCommitteeTypeStringFromEnum(committeeType, true)}
                </SecondaryTitle>
                <CommitteeLayout committees={filterdCommitteesByType} />
              </div>
            );
          })}
        </SectionWrapper>
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  await ssg.committee.getAll.prefetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};
```

### Git and Github

This project is hosted on Github and is version controlled with Git. This means that all changes to the project are tracked and can be reverted if needed. The project is hosted on the Z-Teknologsektionen organization on Github. The project is divided into different branches, where the `main` branch is the branch that is deployed to the website and `dev` is deployed to the test website. The two branches are protected and you need to create a pull request to merge your changes into the `dev` branch. `main` is only updated from the `dev` branch when the team feels the code is mature enough to go to production (usually every 2 weeks). This is to ensure that the code is reviewed before it is displayed on the website. The project is also divided into different issues and features where each feature or issue has their own branch. This is to keep track of what needs to be done and to keep the project organized. The project also has a project board where the different issues and features are placed in different columns depending on their status. This is to keep track of what needs to be done and what is being worked on.

All new branches should be a copy of the current `dev` branch and be named based on the issue or feature that is being worked on. When the feature or issue is done, a pull request should be created and the code should be reviewed by another member of the team. When the code is reviewed and approved, it can be merged into the `dev` branch. The code is then tested on the test website and if everything works as expected, it can be merged into the `main` branch. This is to ensure that the code is reviewed before it is displayed on the website.

Feature branches should be named `feat_nameOfFeature` and issue branches should be named `fix_nameOfIssue`. This is to keep the project organized and to keep track of what needs to be done.

### Automatic deployment

The project is deployed with Vercel which streamlines the deployment process. When a pull request is created and the code is reviewed and approved, the code is automatically deployed to the test website. This is to ensure that the code works as expected and to make it easier to test the code. When the code is merged into the `main` branch, the code is automatically deployed to the production website. This is to ensure that the code is always up to date and that the website is always displaying the latest version of the code.

Before the project can be deployed to Vercel, it needs to pass some basic checks. These checks runs automatically on every commit to the repository. The checks are `npm run lint` and `npm run typecheck`. These checks are used to ensure that the code is clean and that there are no errors in the code. If the checks fail, the code might not be deployed to Vercel.

### Standards

### Prisma and Database

### tRPC and NextAuth.js

Todo: Dennis to write about tRPC and NextAuth.js

### TailwindCSS
