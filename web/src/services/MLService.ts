import { DataExtraction } from "./MLService/DataExtraction";
import server from "../server.json";
import { Entity } from "../types/NERResponse";
import { DataAgent } from "./MLService/DataAgent";

class MLService {
  private static instance: MLService;
  private service: DataExtraction;
  private dataExtractor: DataAgent;
  public endpoints = server.MLService;

  private constructor() {
    this.service = new DataExtraction(this.endpoints.OCR, this.endpoints.NER);
    this.dataExtractor = new DataAgent();
  }

  // Singleton accessor
  public static getInstance(): MLService {
    if (!MLService.instance) {
      MLService.instance = new MLService();
    }
    return MLService.instance;
  }

  async extractFileInformation(file: File): Promise<Entity[]> {
    return this.service.extractFileInformation(file);
  }

  async extractText(file: File): Promise<string> {
    return this.service.extractText(file);
  }

  async extractNERInformation(text: string): Promise<Entity[]> {
    return this.service.extractNERInformation(text);
  }
  async extractData(file: File): Promise<any> {
    return this.dataExtractor.extract(file);
  }
  async responseOCR(file: File): Promise<any> {
    return this.service.responseOCR(file);
  }
  async responseNER(text: string): Promise<any> {
    return this.service.responseNER(text);
  }
  async responseDataExtraction(file: File): Promise<any> {
    return this.dataExtractor.response(file);
  }
}

const mlService = MLService.getInstance();
export { MLService, mlService };
