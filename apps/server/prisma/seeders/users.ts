import { UserStatus } from "@prisma/client";
import { hash } from "bcrypt";

import { prisma } from "../../src/config/database";
import env from "../../src/config/env";
import { JwtManager } from "../../src/shared/infra/jwtManager";

export async function seedUsers() {
  const jwt = new JwtManager();
  const passwordHash = await hash("password", env.salt);

  const useres = [
    {
      email: "app@inlocco.com.br",
      username: "username",
      password: passwordHash,
      confirmationCode: jwt.generate({ email: "app@inlocco.com.br" }),
      acceptedTerms: true,
      status: UserStatus.ACTIVE,
      profile: {
        create: {
          address: {
            create: {},
          },
        },
      },
    },
    {
      email: "app2@inlocco.com.br",
      username: "username2",
      password: passwordHash,
      confirmationCode: jwt.generate({ email: "app2@inlocco.com.br" }),
      acceptedTerms: true,
      status: UserStatus.ACTIVE,
      profile: {
        create: {
          address: {
            create: {},
          },
        },
      },
    },
  ];

  useres.map(
    async (user) =>
      await prisma.users.create({
        data: user,
      })
  );
}
