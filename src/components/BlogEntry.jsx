import React from 'react';
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import PropTypes from 'prop-types';

const createDate = (mysqlDate) => {
  const dateParts = mysqlDate.split('-');
  return new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2));
};

const BlogEntry = props => (
  <Card className="blogEntry">
    <CardMedia overlay={<CardTitle title={props.title} subtitle={createDate(props.date).toDateString()} />}>
      <img alt="logo" src="http://kitingbarbados.com/images/album/1.jpg" />
    </CardMedia>
    <CardText>
      <div dangerouslySetInnerHTML={{ __html: props.abstract }} />
    </CardText>
  </Card>
);

BlogEntry.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  abstract: PropTypes.string.isRequired,
};

export default BlogEntry;
