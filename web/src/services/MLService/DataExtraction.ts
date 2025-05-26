import { NERService } from "./NERService";
import { OCRService } from "./OCRService";
import { Entity } from "../../types/NERResponse";
export class DataExtraction {
  private serviceOCR: OCRService;
  private serviceNER: NERService;
  constructor(endpointOCR: string, endpointNER: string) {
    this.serviceOCR = new OCRService(endpointOCR);
    this.serviceNER = new NERService(endpointNER);
  }
  async extractFileInformation(file: File): Promise<Entity[]> {
    const textResponse = await this.serviceOCR.extract(file);
    const dataRespnse = await this.serviceNER.extract(textResponse);
    return dataRespnse;
  }
  async extractText(file: File): Promise<string> {
    const textResponse = await this.serviceOCR.extract(file);
    return textResponse;
  }
  async extractNERInformation(file: string): Promise<Entity[]> {
    const dataRespnse = await this.serviceNER.extract(file);
    return dataRespnse;
  }
  async responseNER(file: string): Promise<any> {
    const response = await this.serviceNER.response(file);
    return response;
  }
  async responseOCR(file: File): Promise<any> {
    const response = await this.serviceOCR.response(file);
    return response;
  }
}
