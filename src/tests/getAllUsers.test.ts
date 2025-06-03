import { axiosInstance, getAllUsers } from "../shared/api";
import apiUrls from "../shared/api/apiUrls";

jest.mock("../shared/api/axiosInstance", () => {
  return {
    __esModule: true,
    default: {
      get: jest.fn(),
    },
  };
});

describe("getAllUsers", () => {
  const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("должен вызвать axiosInstance.get с apiUrls.users.allUsers() и вернуть ожидаемый payload", async () => {
    const usersPayload = {
      data: [
        {
          id: 1,
          fullName: "Александра Ветрова",
          email: "al.vetrova@avito.ru",
          description: "Frontend Tech Lead",
          avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
          teamId: 1,
          teamName: "Frontend Team",
          tasksCount: 9,
        },
        {
          id: 2,
          fullName: "Илья Романов",
          email: "il.romanov@avito.ru",
          description: "Senior Frontend Developer",
          avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
          teamId: 1,
          teamName: "Frontend Team",
          tasksCount: 10,
        },
        {
          id: 3,
          fullName: "Дмитрий Козлов",
          email: "dm.kozlov@avito.ru",
          description: "Backend Architect",
          avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
          teamId: 2,
          teamName: "Backend Team",
          tasksCount: 10,
        },
        {
          id: 4,
          fullName: "Екатерина Смирнова",
          email: "ek.smirnova@avito.ru",
          description: "Senior Backend Developer",
          avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
          teamId: 2,
          teamName: "Backend Team",
          tasksCount: 3,
        },
        {
          id: 5,
          fullName: "Артем Белов",
          email: "ar.belov@avito.ru",
          description: "QA Automation Lead",
          avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
          teamId: 3,
          teamName: "QA Team",
          tasksCount: 5,
        },
        {
          id: 6,
          fullName: "Ольга Новикова",
          email: "ol.novikova@avito.ru",
          description: "Manual QA Engineer",
          avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
          teamId: 3,
          teamName: "QA Team",
          tasksCount: 2,
        },
        {
          id: 7,
          fullName: "Максим Орлов",
          email: "mx.orlov@avito.ru",
          description: "DevOps Engineer",
          avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg",
          teamId: 4,
          teamName: "DevOps Team",
          tasksCount: 10,
        },
      ],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: usersPayload });

    const result = await getAllUsers();

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(apiUrls.users.allUsers());

    expect(result).toEqual(usersPayload);
  });

  it("должен пробросить ошибку, если axiosInstance.get выбрасывает исключение", async () => {
    const fakeError = new Error("Unable to fetch users");
    mockedAxios.get.mockRejectedValueOnce(fakeError);

    await expect(getAllUsers()).rejects.toThrow("Unable to fetch users");

    expect(mockedAxios.get).toHaveBeenCalledWith(apiUrls.users.allUsers());
  });
});
