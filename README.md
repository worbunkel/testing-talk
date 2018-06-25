# Pro Testing
###### How to write testable code without hating yourself

---------------

## Why care?

 - Good tests are good documentation.
 - Testable code is readable code (most of the time).
 - Good tests guard against future regressions.
 - Code is for humans, not for computers.
 - Testable code allows for refactoring with confidence.
 - Hard-to-understand code is bad for everyone.
 - You should care.

---------------

## Write mostly unit tests
 - then integration tests
 - then end-to-end (feature) tests
 - then QA

---------------

## TDD where you can
 - Write list of comment expects
 - Simplest case first
 - Explain the desired behavior for various contexts
 - Write the tests so that they fail
 - Write the code so that they pass

---------------

## Write many small functions
 - Bits are free. Use them.
 - Extract any unit-testable blocks, no matter if you think you should or not.
 - Each function should do one thing and do it well.
---------------

## Don't use anonymous functions
 - They are hard to trace.
 - They are untestable.

---------------

## Write pure functions with inputs and outputs

 - Always return a value, unless it's for a side effect.
 - Never return undefined.
 - Inject Dependencies

---------------

## Don't mutate variables.  Don't mutate parameters.
 - Values shifting unpredictably are untestable.
 - Pass by reference arguments
 - Look out for functions that mutate

---------------

## Don't test third-party libraries
 - Don't test that Angular works.
 - Don't test that Lodash works.
 - Don't test that the core library works.

---------------


## Test what it does, not how it does it.
#### AKA Don't test implementation
[example1](https://github.com/mawrkus/js-unit-testing-guide#test-the-behaviour-not-the-internal-implementation)
[example2](https://github.com/mawrkus/js-unit-testing-guide#dont-write-unnecessary-expectations)


---------------

## Test failure cases
 - Great!  It works in the success case.  What is supposed to happen if it fails?

---------------

## Make predicates of your conditionals.

---------------

## Separate business logic from your views
 - Views should be dumb.  They should just render their inputs.

---------------

# Protips

---------------

### Coverage is a vanity metric.
 It's nice to have 100% coverage, but some things don't need tests. For example:
 
 - Testing a configuration.
 - Testing object properties that aren't generated. 

---------------

### Technical debt sucks.
 - Budget time to write good tests.

---------------

### Arrange, Act, Assert
#### Separate with white space
 - setup (Arrange)
 - call function (Act)
 - expect (Assert) 

---------------

### If the tests are hard to write, the code is probably the problem
 
---------------

### JS Unit Testing Guide
[link](https://github.com/mawrkus/js-unit-testing-guide)

---------------

# Creds
 - Luke Brown
 - Ricky Hanna
 - Ted Lorts