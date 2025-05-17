import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { lambdaHandler } from '../../workflows-control/app';
import { expect, describe, it } from '@jest/globals';

describe('Unit test for app handler', function () {
    const event: APIGatewayProxyEvent = {
            httpMethod: 'get',
            body: '',
            headers: {},
            isBase64Encoded: false,
            multiValueHeaders: {},
            multiValueQueryStringParameters: {},
            path: '/hello',
            pathParameters: {},
            queryStringParameters: {},
            requestContext: {
                accountId: '123456789012',
                apiId: '1234',
                authorizer: {},
                httpMethod: 'get',
                identity: {
                    accessKey: '',
                    accountId: '',
                    apiKey: '',
                    apiKeyId: '',
                    caller: '',
                    clientCert: {
                        clientCertPem: '',
                        issuerDN: '',
                        serialNumber: '',
                        subjectDN: '',
                        validity: { notAfter: '', notBefore: '' },
                    },
                    cognitoAuthenticationProvider: '',
                    cognitoAuthenticationType: '',
                    cognitoIdentityId: '',
                    cognitoIdentityPoolId: '',
                    principalOrgId: '',
                    sourceIp: '',
                    user: '',
                    userAgent: '',
                    userArn: '',
                },
                path: '/hello',
                protocol: 'HTTP/1.1',
                requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
                requestTimeEpoch: 1428582896000,
                resourceId: '123456',
                resourcePath: '/hello',
                stage: 'dev',
            },
            resource: '',
            stageVariables: {},
        };
    it('verifies failed response', async () => {
        const result: APIGatewayProxyResult = await lambdaHandler(event);
        expect(result.statusCode).toEqual(500);
        expect(result.body).toEqual(
            JSON.stringify({
                message: 'some error happened',
            }),
        );
    });
    it('verifies successful response when any failure test cases', async () => {
        event.body = JSON.stringify({
            job_name : "Print test results",
            status: "completed",
            conclusion: "success",
            repository: "clac-flows",
            log: "eyJudW1GYWlsZWRUZXN0U3VpdGVzIjoxLCJudW1GYWlsZWRUZXN0cyI6MSwibnVtUGFzc2VkVGVzdFN1aXRlcyI6MCwibnVtUGFzc2VkVGVzdHMiOjMsIm51bVBlbmRpbmdUZXN0U3VpdGVzIjowLCJudW1QZW5kaW5nVGVzdHMiOjAsIm51bVJ1bnRpbWVFcnJvclRlc3RTdWl0ZXMiOjAsIm51bVRvZG9UZXN0cyI6MCwibnVtVG90YWxUZXN0U3VpdGVzIjoxLCJudW1Ub3RhbFRlc3RzIjo0LCJvcGVuSGFuZGxlcyI6W10sInNuYXBzaG90Ijp7ImFkZGVkIjowLCJkaWRVcGRhdGUiOmZhbHNlLCJmYWlsdXJlIjpmYWxzZSwiZmlsZXNBZGRlZCI6MCwiZmlsZXNSZW1vdmVkIjowLCJmaWxlc1JlbW92ZWRMaXN0IjpbXSwiZmlsZXNVbm1hdGNoZWQiOjAsImZpbGVzVXBkYXRlZCI6MCwibWF0Y2hlZCI6MCwidG90YWwiOjAsInVuY2hlY2tlZCI6MCwidW5jaGVja2VkS2V5c0J5RmlsZSI6W10sInVubWF0Y2hlZCI6MCwidXBkYXRlZCI6MH0sInN0YXJ0VGltZSI6MTc0NzUxMDIxMjkzMywic3VjY2VzcyI6ZmFsc2UsInRlc3RSZXN1bHRzIjpbeyJhc3NlcnRpb25SZXN1bHRzIjpbeyJhbmNlc3RvclRpdGxlcyI6WyJhZGQgZnVuY3Rpb24iXSwiZHVyYXRpb24iOjIsImZhaWx1cmVEZXRhaWxzIjpbXSwiZmFpbHVyZU1lc3NhZ2VzIjpbXSwiZnVsbE5hbWUiOiJhZGQgZnVuY3Rpb24gYWRkcyB0d28gcG9zaXRpdmUgbnVtYmVycyIsImludm9jYXRpb25zIjoxLCJsb2NhdGlvbiI6bnVsbCwibnVtUGFzc2luZ0Fzc2VydHMiOjEsInJldHJ5UmVhc29ucyI6W10sInN0YXR1cyI6InBhc3NlZCIsInRpdGxlIjoiYWRkcyB0d28gcG9zaXRpdmUgbnVtYmVycyJ9LHsiYW5jZXN0b3JUaXRsZXMiOlsiYWRkIGZ1bmN0aW9uIl0sImR1cmF0aW9uIjoyLCJmYWlsdXJlRGV0YWlscyI6W3sibWF0Y2hlclJlc3VsdCI6eyJhY3R1YWwiOjMsImV4cGVjdGVkIjoxMDAsIm1lc3NhZ2UiOiJleHBlY3QocmVjZWl2ZWQpLnRvQmUoZXhwZWN0ZWQpIC8vIE9iamVjdC5pcyBlcXVhbGl0eVxuXG5FeHBlY3RlZDogMTAwXG5SZWNlaXZlZDogMyIsIm5hbWUiOiJ0b0JlIiwicGFzcyI6ZmFsc2V9fV0sImZhaWx1cmVNZXNzYWdlcyI6WyJFcnJvcjogZXhwZWN0KHJlY2VpdmVkKS50b0JlKGV4cGVjdGVkKSAvLyBPYmplY3QuaXMgZXF1YWxpdHlcblxuRXhwZWN0ZWQ6IDEwMFxuUmVjZWl2ZWQ6IDNcbiAgICBhdCBPYmplY3QuPGFub255bW91cz4gKC9ob21lL3J1bm5lci93b3JrL2NsYWMtZmxvd3MvY2xhYy1mbG93cy90ZXN0cy9hcHAudGVzdC50czo5OjI0KVxuICAgIGF0IFByb21pc2UudGhlbi5jb21wbGV0ZWQgKC9ob21lL3J1bm5lci93b3JrL2NsYWMtZmxvd3MvY2xhYy1mbG93cy9ub2RlX21vZHVsZXMvamVzdC1jaXJjdXMvYnVpbGQvdXRpbHMuanM6Mjk4OjI4KVxuICAgIGF0IG5ldyBQcm9taXNlICg8YW5vbnltb3VzPilcbiAgICBhdCBjYWxsQXN5bmNDaXJjdXNGbiAoL2hvbWUvcnVubmVyL3dvcmsvY2xhYy1mbG93cy9jbGFjLWZsb3dzL25vZGVfbW9kdWxlcy9qZXN0LWNpcmN1cy9idWlsZC91dGlscy5qczoyMzE6MTApXG4gICAgYXQgX2NhbGxDaXJjdXNUZXN0ICgvaG9tZS9ydW5uZXIvd29yay9jbGFjLWZsb3dzL2NsYWMtZmxvd3Mvbm9kZV9tb2R1bGVzL2plc3QtY2lyY3VzL2J1aWxkL3J1bi5qczozMTY6NDApXG4gICAgYXQgcHJvY2Vzc1RpY2tzQW5kUmVqZWN0aW9ucyAobm9kZTppbnRlcm5hbC9wcm9jZXNzL3Rhc2tfcXVldWVzOjEwNTo1KVxuICAgIGF0IF9ydW5UZXN0ICgvaG9tZS9ydW5uZXIvd29yay9jbGFjLWZsb3dzL2NsYWMtZmxvd3Mvbm9kZV9tb2R1bGVzL2plc3QtY2lyY3VzL2J1aWxkL3J1bi5qczoyNTI6MylcbiAgICBhdCBfcnVuVGVzdHNGb3JEZXNjcmliZUJsb2NrICgvaG9tZS9ydW5uZXIvd29yay9jbGFjLWZsb3dzL2NsYWMtZmxvd3Mvbm9kZV9tb2R1bGVzL2plc3QtY2lyY3VzL2J1aWxkL3J1bi5qczoxMjY6OSlcbiAgICBhdCBfcnVuVGVzdHNGb3JEZXNjcmliZUJsb2NrICgvaG9tZS9ydW5uZXIvd29yay9jbGFjLWZsb3dzL2NsYWMtZmxvd3Mvbm9kZV9tb2R1bGVzL2plc3QtY2lyY3VzL2J1aWxkL3J1bi5qczoxMjE6OSlcbiAgICBhdCBydW4gKC9ob21lL3J1bm5lci93b3JrL2NsYWMtZmxvd3MvY2xhYy1mbG93cy9ub2RlX21vZHVsZXMvamVzdC1jaXJjdXMvYnVpbGQvcnVuLmpzOjcxOjMpXG4gICAgYXQgcnVuQW5kVHJhbnNmb3JtUmVzdWx0c1RvSmVzdEZvcm1hdCAoL2hvbWUvcnVubmVyL3dvcmsvY2xhYy1mbG93cy9jbGFjLWZsb3dzL25vZGVfbW9kdWxlcy9qZXN0LWNpcmN1cy9idWlsZC9sZWdhY3ktY29kZS10b2RvLXJld3JpdGUvamVzdEFkYXB0ZXJJbml0LmpzOjEyMjoyMSlcbiAgICBhdCBqZXN0QWRhcHRlciAoL2hvbWUvcnVubmVyL3dvcmsvY2xhYy1mbG93cy9jbGFjLWZsb3dzL25vZGVfbW9kdWxlcy9qZXN0LWNpcmN1cy9idWlsZC9sZWdhY3ktY29kZS10b2RvLXJld3JpdGUvamVzdEFkYXB0ZXIuanM6Nzk6MTkpXG4gICAgYXQgcnVuVGVzdEludGVybmFsICgvaG9tZS9ydW5uZXIvd29yay9jbGFjLWZsb3dzL2NsYWMtZmxvd3Mvbm9kZV9tb2R1bGVzL2plc3QtcnVubmVyL2J1aWxkL3J1blRlc3QuanM6MzY3OjE2KVxuICAgIGF0IHJ1blRlc3QgKC9ob21lL3J1bm5lci93b3JrL2NsYWMtZmxvd3MvY2xhYy1mbG93cy9ub2RlX21vZHVsZXMvamVzdC1ydW5uZXIvYnVpbGQvcnVuVGVzdC5qczo0NDQ6MzQpIl0sImZ1bGxOYW1lIjoiYWRkIGZ1bmN0aW9uIGFkZHMgYSBwb3NpdGl2ZSBhbmQgYSBuZWdhdGl2ZSBudW1iZXIiLCJpbnZvY2F0aW9ucyI6MSwibG9jYXRpb24iOm51bGwsIm51bVBhc3NpbmdBc3NlcnRzIjowLCJyZXRyeVJlYXNvbnMiOltdLCJzdGF0dXMiOiJmYWlsZWQiLCJ0aXRsZSI6ImFkZHMgYSBwb3NpdGl2ZSBhbmQgYSBuZWdhdGl2ZSBudW1iZXIifSx7ImFuY2VzdG9yVGl0bGVzIjpbImFkZCBmdW5jdGlvbiJdLCJkdXJhdGlvbiI6MCwiZmFpbHVyZURldGFpbHMiOltdLCJmYWlsdXJlTWVzc2FnZXMiOltdLCJmdWxsTmFtZSI6ImFkZCBmdW5jdGlvbiBhZGRzIHR3byBuZWdhdGl2ZSBudW1iZXJzIiwiaW52b2NhdGlvbnMiOjEsImxvY2F0aW9uIjpudWxsLCJudW1QYXNzaW5nQXNzZXJ0cyI6MSwicmV0cnlSZWFzb25zIjpbXSwic3RhdHVzIjoicGFzc2VkIiwidGl0bGUiOiJhZGRzIHR3byBuZWdhdGl2ZSBudW1iZXJzIn0seyJhbmNlc3RvclRpdGxlcyI6WyJhZGQgZnVuY3Rpb24iXSwiZHVyYXRpb24iOjAsImZhaWx1cmVEZXRhaWxzIjpbXSwiZmFpbHVyZU1lc3NhZ2VzIjpbXSwiZnVsbE5hbWUiOiJhZGQgZnVuY3Rpb24gYWRkcyB6ZXJvIHRvIGEgbnVtYmVyIiwiaW52b2NhdGlvbnMiOjEsImxvY2F0aW9uIjpudWxsLCJudW1QYXNzaW5nQXNzZXJ0cyI6MSwicmV0cnlSZWFzb25zIjpbXSwic3RhdHVzIjoicGFzc2VkIiwidGl0bGUiOiJhZGRzIHplcm8gdG8gYSBudW1iZXIifV0sImVuZFRpbWUiOjE3NDc1MTAyMTQ5OTYsIm1lc3NhZ2UiOiIgIOKXjyBhZGQgZnVuY3Rpb24g4oC6IGFkZHMgYSBwb3NpdGl2ZSBhbmQgYSBuZWdhdGl2ZSBudW1iZXJcblxuICAgIGV4cGVjdChyZWNlaXZlZCkudG9CZShleHBlY3RlZCkgLy8gT2JqZWN0LmlzIGVxdWFsaXR5XG5cbiAgICBFeHBlY3RlZDogMTAwXG4gICAgUmVjZWl2ZWQ6IDNcblxuICAgIFx1MDAxYlswbSBcdTAwMWJbOTBtICA3IHxcdTAwMWJbMzltXG4gICAgIFx1MDAxYls5MG0gIDggfFx1MDAxYlszOW0gICB0ZXN0KFx1MDAxYlszMm0nYWRkcyBhIHBvc2l0aXZlIGFuZCBhIG5lZ2F0aXZlIG51bWJlcidcdTAwMWJbMzltXHUwMDFiWzMzbSxcdTAwMWJbMzltICgpIFx1MDAxYlszM209Plx1MDAxYlszOW0ge1xuICAgIFx1MDAxYlszMW1cdTAwMWJbMW0+XHUwMDFiWzIybVx1MDAxYlszOW1cdTAwMWJbOTBtICA5IHxcdTAwMWJbMzltICAgICBleHBlY3QoYWRkKFx1MDAxYlszNW01XHUwMDFiWzM5bVx1MDAxYlszM20sXHUwMDFiWzM5bSBcdTAwMWJbMzNtLVx1MDAxYlszOW1cdTAwMWJbMzVtMlx1MDAxYlszOW0pKVx1MDAxYlszM20uXHUwMDFiWzM5bXRvQmUoXHUwMDFiWzM1bTEwMFx1MDAxYlszOW0pXHUwMDFiWzMzbTtcdTAwMWJbMzltXG4gICAgIFx1MDAxYls5MG0gICAgfFx1MDAxYlszOW0gICAgICAgICAgICAgICAgICAgICAgICBcdTAwMWJbMzFtXHUwMDFiWzFtXlx1MDAxYlsyMm1cdTAwMWJbMzltXG4gICAgIFx1MDAxYls5MG0gMTAgfFx1MDAxYlszOW0gICB9KVx1MDAxYlszM207XHUwMDFiWzM5bVxuICAgICBcdTAwMWJbOTBtIDExIHxcdTAwMWJbMzltXG4gICAgIFx1MDAxYls5MG0gMTIgfFx1MDAxYlszOW0gICB0ZXN0KFx1MDAxYlszMm0nYWRkcyB0d28gbmVnYXRpdmUgbnVtYmVycydcdTAwMWJbMzltXHUwMDFiWzMzbSxcdTAwMWJbMzltICgpIFx1MDAxYlszM209Plx1MDAxYlszOW0ge1x1MDAxYlswbVxuXG4gICAgICBhdCBPYmplY3QuPGFub255bW91cz4gKHRlc3RzL2FwcC50ZXN0LnRzOjk6MjQpXG4iLCJuYW1lIjoiL2hvbWUvcnVubmVyL3dvcmsvY2xhYy1mbG93cy9jbGFjLWZsb3dzL3Rlc3RzL2FwcC50ZXN0LnRzIiwic3RhcnRUaW1lIjoxNzQ3NTEwMjEzMTkxLCJzdGF0dXMiOiJmYWlsZWQiLCJzdW1tYXJ5IjoiIn1dLCJ3YXNJbnRlcnJ1cHRlZCI6ZmFsc2V9Cg=="
        })
        const result: APIGatewayProxyResult = await lambdaHandler(event);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(
            JSON.stringify({
                message: 'hello world',
            }),
        );
    });
    it('verifies successful response for all passed test cases', async () => {
        event.body = JSON.stringify({
            job_name : "Print test results",
            status: "completed",
            conclusion: "success",
            repository: "clac-flows",
            log: "eyJudW1GYWlsZWRUZXN0U3VpdGVzIjowLCJudW1GYWlsZWRUZXN0cyI6MCwibnVtUGFzc2VkVGVzdFN1aXRlcyI6MSwibnVtUGFzc2VkVGVzdHMiOjQsIm51bVBlbmRpbmdUZXN0U3VpdGVzIjowLCJudW1QZW5kaW5nVGVzdHMiOjAsIm51bVJ1bnRpbWVFcnJvclRlc3RTdWl0ZXMiOjAsIm51bVRvZG9UZXN0cyI6MCwibnVtVG90YWxUZXN0U3VpdGVzIjoxLCJudW1Ub3RhbFRlc3RzIjo0LCJvcGVuSGFuZGxlcyI6W10sInNuYXBzaG90Ijp7ImFkZGVkIjowLCJkaWRVcGRhdGUiOmZhbHNlLCJmYWlsdXJlIjpmYWxzZSwiZmlsZXNBZGRlZCI6MCwiZmlsZXNSZW1vdmVkIjowLCJmaWxlc1JlbW92ZWRMaXN0IjpbXSwiZmlsZXNVbm1hdGNoZWQiOjAsImZpbGVzVXBkYXRlZCI6MCwibWF0Y2hlZCI6MCwidG90YWwiOjAsInVuY2hlY2tlZCI6MCwidW5jaGVja2VkS2V5c0J5RmlsZSI6W10sInVubWF0Y2hlZCI6MCwidXBkYXRlZCI6MH0sInN0YXJ0VGltZSI6MTc0NzUwOTA5OTM5Miwic3VjY2VzcyI6dHJ1ZSwidGVzdFJlc3VsdHMiOlt7ImFzc2VydGlvblJlc3VsdHMiOlt7ImFuY2VzdG9yVGl0bGVzIjpbImFkZCBmdW5jdGlvbiJdLCJkdXJhdGlvbiI6MiwiZmFpbHVyZURldGFpbHMiOltdLCJmYWlsdXJlTWVzc2FnZXMiOltdLCJmdWxsTmFtZSI6ImFkZCBmdW5jdGlvbiBhZGRzIHR3byBwb3NpdGl2ZSBudW1iZXJzIiwiaW52b2NhdGlvbnMiOjEsImxvY2F0aW9uIjpudWxsLCJudW1QYXNzaW5nQXNzZXJ0cyI6MSwicmV0cnlSZWFzb25zIjpbXSwic3RhdHVzIjoicGFzc2VkIiwidGl0bGUiOiJhZGRzIHR3byBwb3NpdGl2ZSBudW1iZXJzIn0seyJhbmNlc3RvclRpdGxlcyI6WyJhZGQgZnVuY3Rpb24iXSwiZHVyYXRpb24iOjEsImZhaWx1cmVEZXRhaWxzIjpbXSwiZmFpbHVyZU1lc3NhZ2VzIjpbXSwiZnVsbE5hbWUiOiJhZGQgZnVuY3Rpb24gYWRkcyBhIHBvc2l0aXZlIGFuZCBhIG5lZ2F0aXZlIG51bWJlciIsImludm9jYXRpb25zIjoxLCJsb2NhdGlvbiI6bnVsbCwibnVtUGFzc2luZ0Fzc2VydHMiOjEsInJldHJ5UmVhc29ucyI6W10sInN0YXR1cyI6InBhc3NlZCIsInRpdGxlIjoiYWRkcyBhIHBvc2l0aXZlIGFuZCBhIG5lZ2F0aXZlIG51bWJlciJ9LHsiYW5jZXN0b3JUaXRsZXMiOlsiYWRkIGZ1bmN0aW9uIl0sImR1cmF0aW9uIjowLCJmYWlsdXJlRGV0YWlscyI6W10sImZhaWx1cmVNZXNzYWdlcyI6W10sImZ1bGxOYW1lIjoiYWRkIGZ1bmN0aW9uIGFkZHMgdHdvIG5lZ2F0aXZlIG51bWJlcnMiLCJpbnZvY2F0aW9ucyI6MSwibG9jYXRpb24iOm51bGwsIm51bVBhc3NpbmdBc3NlcnRzIjoxLCJyZXRyeVJlYXNvbnMiOltdLCJzdGF0dXMiOiJwYXNzZWQiLCJ0aXRsZSI6ImFkZHMgdHdvIG5lZ2F0aXZlIG51bWJlcnMifSx7ImFuY2VzdG9yVGl0bGVzIjpbImFkZCBmdW5jdGlvbiJdLCJkdXJhdGlvbiI6MCwiZmFpbHVyZURldGFpbHMiOltdLCJmYWlsdXJlTWVzc2FnZXMiOltdLCJmdWxsTmFtZSI6ImFkZCBmdW5jdGlvbiBhZGRzIHplcm8gdG8gYSBudW1iZXIiLCJpbnZvY2F0aW9ucyI6MSwibG9jYXRpb24iOm51bGwsIm51bVBhc3NpbmdBc3NlcnRzIjoxLCJyZXRyeVJlYXNvbnMiOltdLCJzdGF0dXMiOiJwYXNzZWQiLCJ0aXRsZSI6ImFkZHMgemVybyB0byBhIG51bWJlciJ9XSwiZW5kVGltZSI6MTc0NzUwOTEwMTM5NCwibWVzc2FnZSI6IiIsIm5hbWUiOiIvaG9tZS9ydW5uZXIvd29yay9jbGFjLWZsb3dzL2NsYWMtZmxvd3MvdGVzdHMvYXBwLnRlc3QudHMiLCJzdGFydFRpbWUiOjE3NDc1MDkwOTk2MDQsInN0YXR1cyI6InBhc3NlZCIsInN1bW1hcnkiOiIifV0sIndhc0ludGVycnVwdGVkIjpmYWxzZX0K"
        })
        const result: APIGatewayProxyResult = await lambdaHandler(event);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(
            JSON.stringify({
                message: 'hello world',
            }),
        );
    });
});
