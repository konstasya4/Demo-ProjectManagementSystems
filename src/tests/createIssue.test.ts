// __tests__/createIssues.test.ts

import { axiosInstance, createIssues } from "../shared/api";
import apiUrls from "../shared/api/apiUrls";

// Мокаем axiosInstance.post
jest.mock("../shared/api/axiosInstance", () => {
  return {
    __esModule: true,
    default: {
      post: jest.fn(),
    },
  };
});

describe("createIssues(payloadCreate)", () => {
  const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("должен вызвать axiosInstance.post с правильным URL и телом, вернуть ID новой задачи", async () => {
    const payloadCreate = {
      assigneeId: 2,
      boardId: 2,
      description: "Создание теста",
      priority: "Medium",
      title: "Создать тест",
    };
    const createResponsePayload = {
      data: {
        id: 51,
      },
    };

    mockedAxios.post.mockResolvedValueOnce({ data: createResponsePayload });

    const result = await createIssues(payloadCreate);

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      apiUrls.issues.createIssue(),
      payloadCreate
    );
    expect(result).toEqual(createResponsePayload);
  });

  it("должен пробросить ошибку, если axiosInstance.post выбрасывает исключение", async () => {
    const payloadCreate = {
      assigneeId: 2,
      boardId: 2,
      description: "Создание теста",
      priority: "Medium",
      title: "Создать тест",
    };
    const fakeError = new Error("Create failed");
    mockedAxios.post.mockRejectedValueOnce(fakeError);

    await expect(createIssues(payloadCreate)).rejects.toThrow("Create failed");
    expect(mockedAxios.post).toHaveBeenCalledWith(
      apiUrls.issues.createIssue(),
      payloadCreate
    );
  });
});
