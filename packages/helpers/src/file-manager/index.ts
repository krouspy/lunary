import * as fs from 'fs';
import * as yaml from 'js-yaml';

export class FileManager {
  private readonly basePath: string;
  private readonly abisPath: string;

  constructor(basePath: string, abisPath: string) {
    this.basePath = this.formatPath(basePath);
    this.abisPath = this.formatPath(abisPath);
  }

  createDirectory(directoryPath: string) {
    const path = this.basePath + directoryPath;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  }

  writeAbiToJsonFile(filename: string, abi: any) {
    const filePath = this.basePath + this.abisPath + `${filename}.json`;
    console.log(`writing file ${filePath}...`);
    this.writeFileSync(filePath, abi);
  }

  writeSubgraphToYamlFile(filename: string, data: object) {
    const filePath = this.basePath + `${filename}.yaml`;
    console.log(`writing file ${filePath}...`);
    const res = yaml.dump(data);
    this.writeFileSync(filePath, res);
  }

  private writeFileSync(filePath: string, fileData: any) {
    fs.writeFileSync(filePath, fileData, 'utf8');
  }

  private formatPath(path: string): string {
    if (path[0] === '/') {
      path = path.substring(1);
    }
    const len = path.length;
    if (path[len - 1] !== '/') {
      path += '/';
    }
    return path;
  }
}
