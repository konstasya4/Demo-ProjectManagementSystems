import { axiosInstance, getItemIssue } from "../shared/api";
import apiUrls from "../shared/api/apiUrls";

jest.mock("../shared/api/axiosInstance", () => {
  return {
    __esModule: true,
    default: {
      get: jest.fn(),
    },
  };
});

describe("getItemIssue", () => {
  const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("должен вызвать axiosInstance.get с apiUrls.issues.itemIssue(id) и вернуть ожидаемые данные", async () => {

    const issuePayload = {
      data: {
        id: 1,
        title: "Реализация новой галереи изображений",
        description:
          "Реализация нового UI компонента с учетом гайдлайнов дизайн-системы. Детали будут уточнены в процессе разработки.",
        priority: "Low",
        status: "InProgress",
        assignee: {
          id: 1,
          fullName: "Александра Ветрова",
          email: "al.vetrova@avito.ru",
          avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        boardName: "Редизайн карточки товара",
      },
    };

    mockedAxios.get.mockResolvedValueOnce({ data: issuePayload });

    const result = await getItemIssue(1);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(apiUrls.issues.itemIssue(1));

    expect(result).toEqual(issuePayload);
  });

  it("должен пробросить ошибку, если axiosInstance.get выбрасывает исключение", async () => {
    const fakeError = new Error("Issue not found");
    mockedAxios.get.mockRejectedValueOnce(fakeError);

    await expect(getItemIssue(1)).rejects.toThrow("Issue not found");

    expect(mockedAxios.get).toHaveBeenCalledWith(apiUrls.issues.itemIssue(1));
  });
});
