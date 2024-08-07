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

[SetUpTestFixture](https://docs.nunit.org/articles/nunit/writing-tests/attributes/setupfixture.html) is a wonderful feature of NUnit that allows you to run a bit of code once for every test fixture in a namespace. Normally, in NUnit I would use the standard `[SetUp]` and `[OneTimeSetUp]` to control the setup of my tests. But I've really become a fan of the `WebApplicationFactory` to test my application from the outside-in. Additionally, I like writing tests that work against the database, and I need a way to control the running of my migrations and database resets.

With `[SetUpTestFixture]` I can now delete the database, then run the migrations once at the very beginning of a test run, rather than at the top of each class (or `[TestFixture]`). This means that the only thing I need to do before my tests is to clean out the data in the database which is much faster than dropping and recreating the database. To clean up the data I'm using [Respawn](https://github.com/jbogard/Respawn), and then I have a bit of code that re-seeds the data needed between runs.

My normal dotnet project setup looks roughly like this.

```text
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

Now, I want to create my `WebApplicationFactory` / `TestServer` for all of my tests in the `MyProject.Tests.Api` namespace so I put the file in that location.

```diff
~/
  src/
    MyProject/
      Api/
        SomeController.cs
        SomeClass.cs
  tests/
    MyProject.Tests/
      Api/
+       ApiSetUpFixture.cs
        SomeControllerTests.cs
      SomeClassTests.cs
```

That looks like

```csharp
[SetUpFixture]
public static class ApiSetUpFixture
{
  [OneTimeSetUp]
  public static async Task OneTime() 
  {
      // set up the WebApplicationFactory
      // set up the database etc
  }
  
  public static TestServer Server { get; set; }
}
```
And this setup code will run once for the entire test run. When I want to use the server I can access the static `Server` property to use it. This `static` nature aligns with its lifecycle which I also like as an ergonomic.
