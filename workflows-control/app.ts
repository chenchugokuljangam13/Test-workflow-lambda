import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const body = JSON.parse(event.body!);
        const decodedLog = JSON.parse(Buffer.from(body.log, 'base64').toString('utf-8'));
        console.log("Repo name:",body.repository);
        console.log("Conclusion:", body.conclusion);
        console.log("Status:", body.status);
        console.log("Total test cases: ", decodedLog.numTotalTests);
        console.log("Test cases passed: ", decodedLog.numPassedTests);
        console.log("Test cases failed: ", decodedLog.numFailedTests);
        console.log("Encoded Log: ", body.log);
        console.log(decodedLog);
         const testHistory = [];
        for (let x of decodedLog?.testResults[0]?.assertionResults) {
                const val = {
                    testName: x.title,
                    testStatus: x.status
                };
                testHistory.push(val)
        };
        console.log(testHistory)
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello world',
            }),
        };
    } catch(err) {
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
