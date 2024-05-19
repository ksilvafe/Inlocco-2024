import { faker } from "@faker-js/faker";
import { Gender } from "@prisma/client";

import { IUsers } from "../../src/@types/models";
import { InMemoryUsersRepository } from "../../src/api/repositories/users/in-memory/InMemoryUsersRepository";
import { UserCreationService } from "../../src/api/services/users/UserCreationService";
import { UserUpdateService } from "../../src/api/services/users/UserUpdateService";
import { UserNotFoundError } from "../../src/shared/errors/UserNotFoundError";

let usersRepository: InMemoryUsersRepository;
let userCreationService: UserCreationService;
let userUpdateService: UserUpdateService;
let userCreated: IUsers;

describe("Services :: Users :: User Update", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    userCreationService = new UserCreationService(usersRepository);
    userUpdateService = new UserUpdateService(usersRepository);

    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    userCreated = await userCreationService.execute(user);
  });

  it("should be able to update a user email and username", async () => {
    const updatedData = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
    };

    const userUpdated = await userUpdateService.execute({
      cuid: userCreated.cuid,
      data: updatedData,
    });

    expect(userUpdated.username).toBe(updatedData.username);
    expect(userUpdated.email).toBe(updatedData.email);
  });

  it("should be able to update a user profile data", async () => {
    const updatedData = {
      profile: {
        update: {
          name: faker.name.fullName(),
          biography: faker.lorem.lines(),
          phone: faker.phone.number("##-9####-####"),
          localization: faker.address.streetAddress(),
          gender: Gender.MALE,
        },
      },
    };

    const userUpdated = await userUpdateService.execute({
      cuid: userCreated.cuid,
      data: updatedData,
    });

    const { update: profileUpdated } = userUpdated.profile;
    const { update: profileUpdatedData } = updatedData.profile;

    expect(profileUpdated.name).toBe(profileUpdatedData.name);
    expect(profileUpdated.biography).toBe(profileUpdatedData.biography);
    expect(profileUpdated.phone).toBe(profileUpdatedData.phone);
    expect(profileUpdated.localization).toBe(profileUpdatedData.localization);
    expect(profileUpdated.gender).toBe(profileUpdatedData.gender);
  });

  it("should be able to update a user profile data", async () => {
    const updatedData = {
      profile: {
        update: {
          address: {
            update: {
              zipcode: faker.address.zipCode(),
              country: faker.address.country(),
              state: faker.address.state(),
              city: faker.address.city(),
              neighborhood: faker.address.cityName(),
              street: faker.address.street(),
              number: faker.address.buildingNumber(),
              complement: faker.address.cityName(),
            },
          },
        },
      },
    };

    const userUpdated = await userUpdateService.execute({
      cuid: userCreated.cuid,
      data: updatedData,
    });

    const { update: addressUpdated } = userUpdated.profile.update.address;
    const { update: addressUpdatedData } = updatedData.profile.update.address;

    expect(addressUpdated.zipcode).toBe(addressUpdatedData.zipcode);
    expect(addressUpdated.country).toBe(addressUpdatedData.country);
    expect(addressUpdated.state).toBe(addressUpdatedData.state);
    expect(addressUpdated.city).toBe(addressUpdatedData.city);
    expect(addressUpdated.neighborhood).toBe(addressUpdatedData.neighborhood);
    expect(addressUpdated.street).toBe(addressUpdatedData.street);
    expect(addressUpdated.number).toBe(addressUpdatedData.number);
    expect(addressUpdated.complement).toBe(addressUpdatedData.complement);
  });

  it("should return user not found when id is invalid", async () => {
    const updatedData = {};
    try {
      await userUpdateService.execute({
        cuid: "invalid_cuid",
        data: updatedData,
      });
    } catch (error: any) {
      expect(error).toBeInstanceOf(UserNotFoundError);
      expect(error.message).toBe("Usuário não encontrado!");
      expect(error.statusCode).toBe(404);
    }
  });
});
