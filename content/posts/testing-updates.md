---
title: 'Old Dog, New Testing Tricks'
date: '2024-04-16'
tags:
  - code
  - testing
disqus_id: e3830965-3269-4d27-aa6d-33d7953ea7ba
withStats: true
description: |
  While working to clean up my testing projects, I discovered a new-to-me 
  NUnit feature called __SetUpFixture__
---

[SetUpTestFixture](https://docs.nunit.org/articles/nunit/writing-tests/attributes/setupfixture.html) is a wonderful feature of NUnit that allows you to run a bit of code once for every test in a namespace.

With this I've been able to speed up my tests by being able to easily control the lifecycle of database migrations.

Normally I would structure my tests to directly mirror my source project (in this case dotnet).

```
~/
    src/
        MyProject/
            Api/
                SomeController.cs
            SomeClass.cs
    tests/
        MyProject.Tests/
            Api/
                SomeControllerTests.cs
            SomeClassTests.cs
```

Before my discovery of this feature, I was running my migrations and data cleaning in each test's setup. This was slow, and I didn't like the constant inheritance that it required.

With this newer approach I can add a class here:

```diff
~/
    src/
        MyProject/
            Api/
                SomeController.cs
+               ApiSetUpFixture.cs
            SomeClass.cs
    tests/
        MyProject.Tests/
            Api/
                SomeControllerTests.cs
            SomeClassTests.cs
```

That looks like

```csharp
[SetUpFixture]
public class ApiSetUpFixture
{
    [OneTimeSetUp]
    public async Task OneTime() 
    {
        // set up the database etc
    }
}
```
And this setup code will run once for each test that exists under the `MyProject.Tests.Api` namespace.
