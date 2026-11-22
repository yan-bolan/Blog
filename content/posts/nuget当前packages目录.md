+++
title = "nuget当前packages目录"
date = "2026-03-04 21:10:07"
slug = "133a0cf6"
aliases = ["/2026/03_04_133a0cf6.html"]
description = "用NuGet.config的globalPackagesFolder把NuGet包缓存改到项目内packages目录，便于跨网络环境迁移时离线构建。"
[taxonomies]
tags = ["nuget", "packages", "本地化"]
[extra]
cover = "https://api.paugram.com/wallpaper/?source=sm"
+++
---

Net Core 默认全局。因受到网络防火墙，现需要在将包放项目当前目录，以便在不同网络环境迁移时构建。牺牲专案目录大小。

在当前目录建NuGet.config

然后执行dotnet restore 执行还原下载



In modern .NET Core projects using the `PackageReference` format, NuGet packages are **not** stored in a project-specific or solution-specific "packages" folder by default. Instead, they are downloaded and stored in a **global-packages folder** that is shared by all projects on the machine. ![Microsoft Learn](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAABcUlEQVR4nO3YMQ1CQRBAwTsEkGABRQjAC2YQQAtisECCgcPAr/nFmym32mxetfN7Oa8Rc3y859b89hq5Wxz2XoB9CSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAgAAAEiZ4/5Zey/xd9fT3Bqv58jdwh8gTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0DcD7bzDOLQOL8WAAAAAElFTkSuQmCC)Microsoft Learn +2

Default Global Packages Folder Location

The default location for the global packages folder depends on the operating system: 

- **Windows:** `%userprofile%\.nuget\packages`
- **macOS/Linux:** `~/.nuget/packages` ![Stack Overflow](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAflBMVEX/XgAgHB0dGx0AFx4tHxzMTwn1WwD/YQAaGx0OGR4YGh2IOhESGh0AGB0VGh4SGR7BSwudQBC6SQxFJxo1IhskHhwAEx+NOxIeHRyyRw3rWATkVgXZUwhVKxnSUQhuMhd6NhOBNxQ7JBqUPRGmQw9iLxhnMBZ1NBZbLBlKJxk8C7FfAAAELklEQVR4nO2Z67aiOBCFMcGEQECuXrgpiJfz/i84AfUIId3tmSlg9azsv7qsz6pNVSUYhpaWlpaWlpaWltZ/Ew12y8Y/uO6ZLhmfIcSb5eL7CVqt0L5ZKAfUN62VEOKHRQhEfHvVyUoOS8TPX/FbAn/+HPjv+ILAmj0H6358QWDO7YMjXg1kWeG8AOTCJYIknDcH6Z1JBGY5cxXucg5W/rwAoxzYcT5zFQqZoM5mBRAEUhU2UT4vQRl7QwIekVkBaCYTbKJ5q0DXtZyDIp00Yi6nuIxtiSCakiCLC6nlUmkqiCoUE1bhzLz9MRs+7b5MwKPJ4meuWIDY/pz2EWiZSARsMh+cus6D8H1QBzrOwWWap7FbQruWx479OgsfWHIOpiAgx3frZcmuVwcaJhIBr+AJaNhvvIgV/eE3IvBu4IOJSHm2t9fyTee7aEiAT8A5oI3U88QTH1fG63/SQCZAwMfGvLZkAFGHuCEvhIYPCZBbgQLs8Ci+kOUeX5vYKAeIg+Ygv3qjGnR1ML+LfZZzYFeQTqTh3UMKAsTq1wE5cKXP8A7UieTsMhWC5d6edXDkKlgBJIBB05vc95914NWj/QcSIdpCH5nCCCvrgKNDl+3dMAfDng0iEiClFWx+afsScXqrMnKhu1ErmlXuuCUIedhp/+77eUV7Z5qDAvFrZR1W7Cug1Di5r7KcJwnfqYmZisDCtRhR1aNhuMGEByWaO66yL9lJlfrd2MSn6cJ38guusoLoS3FbH3aD81++JopkUqOJuIJghdr4Xg0W3qBFcnd8g44gaH7aKusgzBCv4QAMjGyGcR2UqSFB0PxuKR9JG/K+ZI2fDudF1eQSA2kSxXxgkAsZ3X0/cTb3zK+qJAN7pVUi18GqQQ8Gl/7vI4th69b0bUn9y7AvIQR6ZZZHcpXRhpn3KiTftiQH3q/D5gIZ3whVRu9sGQVl9rAEJU6y+f6Mw07As7LpPm35dWryRyLWV/zMFIZ9h0EK5QryYmBeEjl+Srq+9HQgbAJSrhx8vWoIWybH1pZZ3X6VA89AX7mOyxCeaxYnx2zfoCDYmzJ6U49+RSI2m/abmyPwEF6fYow96zMKIbf882/+VHlwrRP2Oy++ZU9yM0BpFu4KjpXb6FBsqrd41Eizw7WdBsrp9xKKJ6jAG4Ia/vlaq49HzwrcJ4z/gCC57yRb/ItEsIkWcVlpc432zB5nAs91XS4sEZ7vlrDlcBDzmeI/GEgWXkzEN2+G6S0gQ1BjHdxixp6OYLCn8Q8hhC2r+HEcc2d+b/VCECrbmYVM8C6QrT9TGbRriwX+voTu9uZnSh4ehL4mpw5Dn6mzgHeEnkTU+eVCqOyDoNdy/wZgtzAAXxwA/E5EA/x1AEubEH4f+nEjAo5v0GqLf6DtFfxQQH4o6PhaWlpaWlpaWlpaWlr/f/0DViY+xu94gUsAAAAASUVORK5CYII=)Stack Overflow +3

Each package is expanded into a subfolder matching its identifier and version number within this global folder. ![Microsoft Learn](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAABcUlEQVR4nO3YMQ1CQRBAwTsEkGABRQjAC2YQQAtisECCgcPAr/nFmym32mxetfN7Oa8Rc3y859b89hq5Wxz2XoB9CSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAgAAAEiZ4/5Zey/xd9fT3Bqv58jdwh8gTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0DcD7bzDOLQOL8WAAAAAElFTkSuQmCC)Microsoft Learn

Configuring a Project-Specific Packages Folder

While the global cache is the default and recommended approach (saving significant disk space across multiple projects/solutions), you can force a single project (or solution) to use a local, dedicated packages folder by using a `NuGet.config` file. ![Stack Overflow](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAflBMVEX/XgAgHB0dGx0AFx4tHxzMTwn1WwD/YQAaGx0OGR4YGh2IOhESGh0AGB0VGh4SGR7BSwudQBC6SQxFJxo1IhskHhwAEx+NOxIeHRyyRw3rWATkVgXZUwhVKxnSUQhuMhd6NhOBNxQ7JBqUPRGmQw9iLxhnMBZ1NBZbLBlKJxk8C7FfAAAELklEQVR4nO2Z67aiOBCFMcGEQECuXrgpiJfz/i84AfUIId3tmSlg9azsv7qsz6pNVSUYhpaWlpaWlpaWltZ/Ew12y8Y/uO6ZLhmfIcSb5eL7CVqt0L5ZKAfUN62VEOKHRQhEfHvVyUoOS8TPX/FbAn/+HPjv+ILAmj0H6358QWDO7YMjXg1kWeG8AOTCJYIknDcH6Z1JBGY5cxXucg5W/rwAoxzYcT5zFQqZoM5mBRAEUhU2UT4vQRl7QwIekVkBaCYTbKJ5q0DXtZyDIp00Yi6nuIxtiSCakiCLC6nlUmkqiCoUE1bhzLz9MRs+7b5MwKPJ4meuWIDY/pz2EWiZSARsMh+cus6D8H1QBzrOwWWap7FbQruWx479OgsfWHIOpiAgx3frZcmuVwcaJhIBr+AJaNhvvIgV/eE3IvBu4IOJSHm2t9fyTee7aEiAT8A5oI3U88QTH1fG63/SQCZAwMfGvLZkAFGHuCEvhIYPCZBbgQLs8Ci+kOUeX5vYKAeIg+Ygv3qjGnR1ML+LfZZzYFeQTqTh3UMKAsTq1wE5cKXP8A7UieTsMhWC5d6edXDkKlgBJIBB05vc95914NWj/QcSIdpCH5nCCCvrgKNDl+3dMAfDng0iEiClFWx+afsScXqrMnKhu1ErmlXuuCUIedhp/+77eUV7Z5qDAvFrZR1W7Cug1Di5r7KcJwnfqYmZisDCtRhR1aNhuMGEByWaO66yL9lJlfrd2MSn6cJ38guusoLoS3FbH3aD81++JopkUqOJuIJghdr4Xg0W3qBFcnd8g44gaH7aKusgzBCv4QAMjGyGcR2UqSFB0PxuKR9JG/K+ZI2fDudF1eQSA2kSxXxgkAsZ3X0/cTb3zK+qJAN7pVUi18GqQQ8Gl/7vI4th69b0bUn9y7AvIQR6ZZZHcpXRhpn3KiTftiQH3q/D5gIZ3whVRu9sGQVl9rAEJU6y+f6Mw07As7LpPm35dWryRyLWV/zMFIZ9h0EK5QryYmBeEjl+Srq+9HQgbAJSrhx8vWoIWybH1pZZ3X6VA89AX7mOyxCeaxYnx2zfoCDYmzJ6U49+RSI2m/abmyPwEF6fYow96zMKIbf882/+VHlwrRP2Oy++ZU9yM0BpFu4KjpXb6FBsqrd41Eizw7WdBsrp9xKKJ6jAG4Ia/vlaq49HzwrcJ4z/gCC57yRb/ItEsIkWcVlpc432zB5nAs91XS4sEZ7vlrDlcBDzmeI/GEgWXkzEN2+G6S0gQ1BjHdxixp6OYLCn8Q8hhC2r+HEcc2d+b/VCECrbmYVM8C6QrT9TGbRriwX+voTu9uZnSh4ehL4mpw5Dn6mzgHeEnkTU+eVCqOyDoNdy/wZgtzAAXxwA/E5EA/x1AEubEH4f+nEjAo5v0GqLf6DtFfxQQH4o6PhaWlpaWlpaWlpaWlr/f/0DViY+xu94gUsAAAAASUVORK5CYII=)Stack Overflow +1

To set this up for a single project:

1. **Create a `NuGet.config` file** in the same directory as your project's `.csproj` file.

2. **Add the `globalPackagesFolder` key** within the `<config>` section of the `NuGet.config` file, specifying a relative or absolute path for the folder.
   
   xml
   
   ```
   <?xml version="1.0" encoding="utf-8"?>
   <configuration>
     <config>
       <!-- The ".\packages" value will create a folder named 'packages' relative to the config file location -->
       <add key="globalPackagesFolder" value=".\packages" />
     </config>
     <!-- You might also need to explicitly define package sources if not using nuget.org default -->
     <packageSources>
       <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
     </packageSources>
   </configuration>
   
   ```

3. **Run `dotnet restore` or build your project** (or use the Visual Studio package manager features). The packages will now be downloaded to the specified local folder.

4. **(Optional, for source control):** If you wish to commit these packages to source control (which is generally discouraged but was a common practice with older `.NET Framework` projects), make sure your `.gitignore` or equivalent file does not exclude the specified `packages` folder. ![Stack Overflow](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAflBMVEX/XgAgHB0dGx0AFx4tHxzMTwn1WwD/YQAaGx0OGR4YGh2IOhESGh0AGB0VGh4SGR7BSwudQBC6SQxFJxo1IhskHhwAEx+NOxIeHRyyRw3rWATkVgXZUwhVKxnSUQhuMhd6NhOBNxQ7JBqUPRGmQw9iLxhnMBZ1NBZbLBlKJxk8C7FfAAAELklEQVR4nO2Z67aiOBCFMcGEQECuXrgpiJfz/i84AfUIId3tmSlg9azsv7qsz6pNVSUYhpaWlpaWlpaWltZ/Ew12y8Y/uO6ZLhmfIcSb5eL7CVqt0L5ZKAfUN62VEOKHRQhEfHvVyUoOS8TPX/FbAn/+HPjv+ILAmj0H6358QWDO7YMjXg1kWeG8AOTCJYIknDcH6Z1JBGY5cxXucg5W/rwAoxzYcT5zFQqZoM5mBRAEUhU2UT4vQRl7QwIekVkBaCYTbKJ5q0DXtZyDIp00Yi6nuIxtiSCakiCLC6nlUmkqiCoUE1bhzLz9MRs+7b5MwKPJ4meuWIDY/pz2EWiZSARsMh+cus6D8H1QBzrOwWWap7FbQruWx479OgsfWHIOpiAgx3frZcmuVwcaJhIBr+AJaNhvvIgV/eE3IvBu4IOJSHm2t9fyTee7aEiAT8A5oI3U88QTH1fG63/SQCZAwMfGvLZkAFGHuCEvhIYPCZBbgQLs8Ci+kOUeX5vYKAeIg+Ygv3qjGnR1ML+LfZZzYFeQTqTh3UMKAsTq1wE5cKXP8A7UieTsMhWC5d6edXDkKlgBJIBB05vc95914NWj/QcSIdpCH5nCCCvrgKNDl+3dMAfDng0iEiClFWx+afsScXqrMnKhu1ErmlXuuCUIedhp/+77eUV7Z5qDAvFrZR1W7Cug1Di5r7KcJwnfqYmZisDCtRhR1aNhuMGEByWaO66yL9lJlfrd2MSn6cJ38guusoLoS3FbH3aD81++JopkUqOJuIJghdr4Xg0W3qBFcnd8g44gaH7aKusgzBCv4QAMjGyGcR2UqSFB0PxuKR9JG/K+ZI2fDudF1eQSA2kSxXxgkAsZ3X0/cTb3zK+qJAN7pVUi18GqQQ8Gl/7vI4th69b0bUn9y7AvIQR6ZZZHcpXRhpn3KiTftiQH3q/D5gIZ3whVRu9sGQVl9rAEJU6y+f6Mw07As7LpPm35dWryRyLWV/zMFIZ9h0EK5QryYmBeEjl+Srq+9HQgbAJSrhx8vWoIWybH1pZZ3X6VA89AX7mOyxCeaxYnx2zfoCDYmzJ6U49+RSI2m/abmyPwEF6fYow96zMKIbf882/+VHlwrRP2Oy++ZU9yM0BpFu4KjpXb6FBsqrd41Eizw7WdBsrp9xKKJ6jAG4Ia/vlaq49HzwrcJ4z/gCC57yRb/ItEsIkWcVlpc432zB5nAs91XS4sEZ7vlrDlcBDzmeI/GEgWXkzEN2+G6S0gQ1BjHdxixp6OYLCn8Q8hhC2r+HEcc2d+b/VCECrbmYVM8C6QrT9TGbRriwX+voTu9uZnSh4ehL4mpw5Dn6mzgHeEnkTU+eVCqOyDoNdy/wZgtzAAXxwA/E5EA/x1AEubEH4f+nEjAo5v0GqLf6DtFfxQQH4o6PhaWlpaWlpaWlpaWlr/f/0DViY+xu94gUsAAAAASUVORK5CYII=)Stack Overflow +4

For more details on managing NuGet configuration, refer to the official [Microsoft Learn](https://learn.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders) documentation.
