import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function getEndedAuctions() {
  const now = new Date();
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    IndexName: 'statusAndEndDate',
    // Here we can specify the values for a partition key and sort key
    // Status is a reserved word so we need to use the expression attribute names, to replace the value of #status by status at runtime
    KeyConditionExpression: '#status = :status AND endingAt <= :now',
    ExpressionAttributeValues: {
      ':status': 'OPEN',
      ':now': now.toISOString(),
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    }
  };

  const result = await dynamodb.query(params).promise();
  return result.Items;
}